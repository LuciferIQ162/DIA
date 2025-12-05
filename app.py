"""
Flask Backend for Document Intelligence Agent
Handles file uploads and document processing API.
"""

import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from agent import DocumentIntelligenceAgent
from pathlib import Path
import json

app = Flask(__name__, static_folder='static')
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# Ensure upload directory exists
Path(UPLOAD_FOLDER).mkdir(exist_ok=True)

# Initialize DIA
agent = DocumentIntelligenceAgent()


def allowed_file(filename):
    """Check if file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def index():
    """Serve the main page."""
    return send_from_directory('static', 'index.html')


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'service': 'Document Intelligence Agent',
        'version': '1.0.0'
    })


@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Handle file upload."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': f'Invalid file type. Allowed: {", ".join(ALLOWED_EXTENSIONS)}'}), 400
    
    try:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        return jsonify({
            'success': True,
            'filename': filename,
            'filepath': filepath
        })
    except Exception as e:
        return jsonify({'error': f'Upload failed: {str(e)}'}), 500


@app.route('/api/process', methods=['POST'])
def process_document():
    """Process documents based on task type."""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['task', 'language', 'document_1']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Validate task type
        valid_tasks = ['summarize', 'extract', 'compare', 'qa']
        if data['task'] not in valid_tasks:
            return jsonify({'error': f'Invalid task. Must be one of: {", ".join(valid_tasks)}'}), 400
        
        # Validate language
        valid_languages = ['en', 'or', 'bilingual']
        if data['language'] not in valid_languages:
            return jsonify({'error': f'Invalid language. Must be one of: {", ".join(valid_languages)}'}), 400
        
        # Validate task-specific requirements
        if data['task'] in ['extract', 'qa'] and not data.get('query'):
            return jsonify({'error': f'Query required for {data["task"]} task'}), 400
        
        if data['task'] == 'compare' and not data.get('document_2'):
            return jsonify({'error': 'Second document required for comparison'}), 400
        
        # Process document
        result = agent.process(
            task=data['task'],
            language=data['language'],
            document_1=data['document_1'],
            document_2=data.get('document_2'),
            query=data.get('query')
        )
        
        return jsonify({
            'success': True,
            'result': result
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file too large error."""
    return jsonify({'error': 'File too large. Maximum size is 16MB'}), 413


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({'error': 'Endpoint not found'}), 404


if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    print(f"🚀 Document Intelligence Agent starting on http://localhost:{port}")
    print(f"📁 Upload folder: {UPLOAD_FOLDER}")
    print(f"🤖 LLM configured: {agent.client is not None}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
