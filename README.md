# Document Intelligence Agent (DIA)

**Industry-level AI-powered document analysis system for government documents**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Python](https://img.shields.io/badge/python-3.8+-green)
![License](https://img.shields.io/badge/license-MIT-orange)

---

## 🎯 Overview

DIA is a production-ready web application that uses advanced AI to read, summarize, compare, and extract information from government documents. Built with Flask backend and modern frontend, supporting English and Odia languages.

### Key Features

✨ **Four Analysis Modes**
- **Summarize**: Generate comprehensive document summaries
- **Extract**: Extract specific information based on queries
- **Compare**: Side-by-side document comparison
- **Q&A**: Ask questions about document content

🌍 **Multilingual Support**
- English (en)
- Odia (ଓଡ଼ିଆ) (or)
- Bilingual output

📄 **Document Formats**
- PDF files
- DOCX (Microsoft Word)
- Plain text (TXT)

🎨 **Premium UI**
- Modern glassmorphism design
- Drag-and-drop file upload
- Real-time processing feedback
- Fully responsive (mobile-ready)

---

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- OpenAI API key (or other LLM provider)
- Modern web browser

### Installation

1. **Clone or navigate to the project directory**
```bash
cd DIA
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Configure environment**
```bash
cp .env.example .env
```

4. **Edit `.env` file with your API key**
```bash
# Open .env and add your OpenAI API key
OPENAI_API_KEY=your_api_key_here
```

5. **Run the application**
```bash
python3 app.py
```

6. **Open in browser**
```
http://localhost:5000
```

---

## 📖 Usage Guide

### Web Interface

1. **Upload Document(s)**
   - Drag and drop files or click to browse
   - Supported: PDF, DOCX, TXT (max 16MB)

2. **Select Analysis Task**
   - Choose from: Summarize, Extract, Compare, Q&A

3. **Choose Language**
   - English, Odia, or Bilingual output

4. **Enter Query** (for Extract/Q&A tasks)
   - Specify what information to extract
   - Ask specific questions

5. **Analyze**
   - Click "Analyze Document"
   - View results in real-time

### Python API

```python
from agent import DocumentIntelligenceAgent

agent = DocumentIntelligenceAgent()

# Summarize a document
result = agent.process(
    task="summarize",
    language="en",
    document_1="path/to/document.pdf"
)

print(result["output"])
```

---

## 🏗️ Project Structure

```
DIA/
├── app.py                 # Flask backend server
├── agent.py              # Document processing agent
├── config.json           # Agent configuration
├── requirements.txt      # Python dependencies
├── .env.example         # Environment template
├── .gitignore           # Git ignore rules
├── static/
│   ├── index.html       # Frontend UI
│   ├── css/
│   │   └── style.css    # Premium styling
│   └── js/
│       └── app.js       # Frontend logic
├── uploads/             # Uploaded files (auto-created)
└── README.md            # This file
```

---

## 🔌 API Reference

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "Document Intelligence Agent",
  "version": "1.0.0"
}
```

### Upload File
```http
POST /api/upload
Content-Type: multipart/form-data
```

**Parameters:**
- `file`: Document file (PDF/DOCX/TXT)

**Response:**
```json
{
  "success": true,
  "filename": "document.pdf",
  "filepath": "uploads/document.pdf"
}
```

### Process Document
```http
POST /api/process
Content-Type: application/json
```

**Request Body:**
```json
{
  "task": "summarize",
  "language": "en",
  "document_1": "uploads/document.pdf",
  "document_2": "uploads/document2.pdf",  // Optional, for compare
  "query": "Extract all dates"            // Required for extract/qa
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "output": "Summary of the document...",
    "missing_info": "Some information was not available"
  }
}
```

See [API_DOCS.md](API_DOCS.md) for complete API documentation.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key | Required |
| `OPENAI_MODEL` | Model to use | `gpt-4` |
| `TEMPERATURE` | Model temperature | `0.3` |
| `FLASK_ENV` | Environment | `development` |
| `FLASK_PORT` | Server port | `5000` |
| `UPLOAD_FOLDER` | Upload directory | `uploads` |
| `MAX_FILE_SIZE` | Max file size | `16777216` (16MB) |

### LLM Providers

The system supports multiple LLM providers. To switch providers:

1. Install provider SDK:
```bash
pip install anthropic  # For Claude
pip install google-generativeai  # For Gemini
```

2. Update `agent.py` to use your preferred provider

3. Set corresponding API key in `.env`

---

## 🚢 Deployment

### Production Deployment

1. **Set production environment**
```bash
export FLASK_ENV=production
```

2. **Use production WSGI server**
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

3. **Configure reverse proxy** (nginx/Apache)

4. **Enable HTTPS** with SSL certificate

### Docker Deployment

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

---

## 🛠️ Development

### Running in Development Mode

```bash
export FLASK_ENV=development
python3 app.py
```

### Code Structure

- **Backend**: Flask REST API with CORS support
- **Document Parsing**: PyPDF2 (PDF), python-docx (DOCX)
- **LLM Integration**: OpenAI GPT-4 (configurable)
- **Frontend**: Vanilla JavaScript, modern CSS

---

## 📝 License

MIT License - feel free to use for commercial or personal projects.

---

## 🤝 Support

For issues or questions:
- Check API documentation
- Review error logs in console
- Ensure API keys are configured correctly

---

## 🎨 Credits

Built with modern web technologies:
- Flask & Python
- OpenAI GPT-4
- Inter & Space Grotesk fonts
- Glassmorphism design patterns

---

**Ready to analyze government documents with AI!** 🚀
