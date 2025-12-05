"""
Document Intelligence Agent (DIA)
Production-ready document processing with LLM integration.
"""

import os
import json
from typing import Dict, Optional
from pathlib import Path
import PyPDF2
from docx import Document
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class DocumentParser:
    """Handle document parsing for various formats."""
    
    @staticmethod
    def parse_pdf(file_path: str) -> str:
        """Extract text from PDF file."""
        try:
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
                return text.strip()
        except Exception as e:
            raise Exception(f"Error parsing PDF: {str(e)}")
    
    @staticmethod
    def parse_docx(file_path: str) -> str:
        """Extract text from DOCX file."""
        try:
            doc = Document(file_path)
            text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
            return text.strip()
        except Exception as e:
            raise Exception(f"Error parsing DOCX: {str(e)}")
    
    @staticmethod
    def parse_file(file_path: str) -> str:
        """Parse file based on extension."""
        ext = Path(file_path).suffix.lower()
        if ext == '.pdf':
            return DocumentParser.parse_pdf(file_path)
        elif ext == '.docx':
            return DocumentParser.parse_docx(file_path)
        elif ext == '.txt':
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        else:
            raise ValueError(f"Unsupported file format: {ext}")


class DocumentIntelligenceAgent:
    """Production-ready DIA with LLM integration."""
    
    def __init__(self, config_path: str = "config.json"):
        with open(config_path) as f:
            self.config = json.load(f)
        
        # Initialize OpenAI client
        api_key = os.getenv("OPENAI_API_KEY")
        if api_key:
            self.client = OpenAI(api_key=api_key)
            self.model = os.getenv("OPENAI_MODEL", "gpt-4")
        else:
            self.client = None
            print("Warning: OPENAI_API_KEY not found. Using mock responses.")
    
    def process(self, task: str, language: str, document_1: str, 
                document_2: Optional[str] = None, query: Optional[str] = None) -> Dict[str, str]:
        """
        Process documents based on task type.
        
        Args:
            task: One of [summarize, extract, compare, qa]
            language: One of [en, or, bilingual]
            document_1: First document text or file path
            document_2: Second document text or file path (for compare)
            query: Query string (for extract/qa)
        
        Returns:
            Dict with 'output' and 'missing_info' keys
        """
        # Parse documents if they are file paths
        doc1_text = self._get_document_text(document_1)
        doc2_text = self._get_document_text(document_2) if document_2 else None
        
        handlers = {
            "summarize": self._summarize,
            "extract": self._extract,
            "compare": self._compare,
            "qa": self._qa
        }
        
        return handlers[task](doc1_text, doc2_text, query, language)
    
    def _get_document_text(self, doc_input: str) -> str:
        """Get document text from file path or direct text."""
        if Path(doc_input).exists():
            return DocumentParser.parse_file(doc_input)
        return doc_input
    
    def _call_llm(self, system_prompt: str, user_prompt: str) -> str:
        """Call LLM with prompts."""
        if not self.client:
            return "LLM not configured. Please set OPENAI_API_KEY in .env file."
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=float(os.getenv("TEMPERATURE", "0.3"))
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error calling LLM: {str(e)}"
    
    def _get_language_instruction(self, lang: str) -> str:
        """Get language-specific instruction."""
        lang_map = {
            "en": "Respond in English only.",
            "or": "Respond in Odia (ଓଡ଼ିଆ) only.",
            "bilingual": "Respond in both English and Odia (ଓଡ଼ିଆ). Use clear section headers for each language."
        }
        return lang_map.get(lang, "Respond in English.")
    
    def _summarize(self, doc1: str, doc2: Optional[str], query: Optional[str], lang: str) -> Dict[str, str]:
        """Generate document summary."""
        system_prompt = self.config['system_prompt']
        lang_instruction = self._get_language_instruction(lang)
        
        user_prompt = f"""
{lang_instruction}

Summarize the following government document. Focus on:
- Main purpose and subject
- Key decisions or directives
- Important dates and deadlines
- Stakeholders mentioned
- Action items

Document:
{doc1}

If any information is missing or unclear, note it in your response.
"""
        
        output = self._call_llm(system_prompt, user_prompt)
        return {
            "output": output,
            "missing_info": self._check_missing_info(output)
        }
    
    def _extract(self, doc1: str, doc2: Optional[str], query: str, lang: str) -> Dict[str, str]:
        """Extract specific information based on query."""
        if not query:
            return {
                "output": "",
                "missing_info": "Query required for extraction"
            }
        
        system_prompt = self.config['system_prompt']
        lang_instruction = self._get_language_instruction(lang)
        
        user_prompt = f"""
{lang_instruction}

Extract the following information from the document:
{query}

Document:
{doc1}

Provide structured, precise extraction. If information is not available, state: "Not available in provided document".
"""
        
        output = self._call_llm(system_prompt, user_prompt)
        return {
            "output": output,
            "missing_info": self._check_missing_info(output)
        }
    
    def _compare(self, doc1: str, doc2: str, query: Optional[str], lang: str) -> Dict[str, str]:
        """Compare two documents."""
        if not doc2:
            return {
                "output": "",
                "missing_info": "Second document required for comparison"
            }
        
        system_prompt = self.config['system_prompt']
        lang_instruction = self._get_language_instruction(lang)
        
        user_prompt = f"""
{lang_instruction}

Compare these two government documents. Highlight:
- Key differences in content, decisions, or directives
- Common elements
- Timeline changes (if any)
- Policy modifications
- New additions or removals

Document 1:
{doc1}

Document 2:
{doc2}

Provide a structured comparison.
"""
        
        output = self._call_llm(system_prompt, user_prompt)
        return {
            "output": output,
            "missing_info": self._check_missing_info(output)
        }
    
    def _qa(self, doc1: str, doc2: Optional[str], query: str, lang: str) -> Dict[str, str]:
        """Answer questions about document."""
        if not query:
            return {
                "output": "",
                "missing_info": "Query required for Q&A"
            }
        
        system_prompt = self.config['system_prompt']
        lang_instruction = self._get_language_instruction(lang)
        
        user_prompt = f"""
{lang_instruction}

Based ONLY on the provided document, answer this question:
{query}

Document:
{doc1}

If the answer is not available in the document, respond: "Not available in provided document".
Be precise and cite relevant parts of the document.
"""
        
        output = self._call_llm(system_prompt, user_prompt)
        return {
            "output": output,
            "missing_info": self._check_missing_info(output)
        }
    
    def _check_missing_info(self, output: str) -> str:
        """Check if output indicates missing information."""
        missing_indicators = [
            "not available in provided document",
            "information is missing",
            "not mentioned in the document",
            "unclear from the document"
        ]
        
        for indicator in missing_indicators:
            if indicator.lower() in output.lower():
                return "Some information was not available in the provided document(s)"
        return ""


if __name__ == "__main__":
    # Example usage
    agent = DocumentIntelligenceAgent()
    
    result = agent.process(
        task="summarize",
        language="en",
        document_1="Sample government circular regarding new policy implementation with effective date January 2024."
    )
    
    print(json.dumps(result, indent=2))
