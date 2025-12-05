/**
 * Document Intelligence Agent - Frontend Logic
 * Handles file uploads, API communication, and UI interactions
 */

// State Management
const state = {
    task: 'summarize',
    language: 'en',
    file1: null,
    file2: null,
    file1Path: null,
    file2Path: null
};

// API Configuration
const API_BASE = window.location.origin;

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    checkServerHealth();
});

// ============================================
// Event Listeners
// ============================================

function initializeEventListeners() {
    // Task selection
    document.querySelectorAll('.task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => selectTask(e.target.closest('.task-btn')));
    });

    // Language selection
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => selectLanguage(e.target.closest('.lang-btn')));
    });

    // File upload areas
    setupFileUpload('uploadArea1', 'fileInput1', 1);
    setupFileUpload('uploadArea2', 'fileInput2', 2);

    // Process button
    document.getElementById('processBtn').addEventListener('click', processDocument);
}

// ============================================
// Server Health Check
// ============================================

async function checkServerHealth() {
    const statusBadge = document.getElementById('statusBadge');
    
    try {
        const response = await fetch(`${API_BASE}/api/health`);
        const data = await response.json();
        
        if (data.status === 'healthy') {
            statusBadge.classList.remove('error');
            statusBadge.querySelector('span:last-child').textContent = 'System Ready';
        } else {
            throw new Error('System not healthy');
        }
    } catch (error) {
        statusBadge.classList.add('error');
        statusBadge.querySelector('span:last-child').textContent = 'System Offline';
        console.error('Health check failed:', error);
    }
}

// ============================================
// Task Selection
// ============================================

function selectTask(btn) {
    // Update UI
    document.querySelectorAll('.task-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update state
    state.task = btn.dataset.task;
    
    // Show/hide second upload area for comparison
    const uploadArea2 = document.getElementById('uploadArea2');
    const uploadGrid = document.querySelector('.upload-grid');
    
    if (state.task === 'compare') {
        uploadArea2.style.display = 'block';
        uploadGrid.classList.add('comparing');
    } else {
        uploadArea2.style.display = 'none';
        uploadGrid.classList.remove('comparing');
        removeFile(2);
    }
    
    // Show/hide query input for extract and qa tasks
    const queryGroup = document.getElementById('queryGroup');
    if (state.task === 'extract' || state.task === 'qa') {
        queryGroup.style.display = 'block';
    } else {
        queryGroup.style.display = 'none';
    }
}

// ============================================
// Language Selection
// ============================================

function selectLanguage(btn) {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.language = btn.dataset.lang;
}

// ============================================
// File Upload Handling
// ============================================

function setupFileUpload(areaId, inputId, fileNumber) {
    const uploadArea = document.getElementById(areaId);
    const fileInput = document.getElementById(inputId);
    
    // Click to upload
    uploadArea.addEventListener('click', () => {
        if (!uploadArea.querySelector('.file-preview').style.display || 
            uploadArea.querySelector('.file-preview').style.display === 'none') {
            fileInput.click();
        }
    });
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0], fileNumber);
        }
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0], fileNumber);
        }
    });
}

async function handleFile(file, fileNumber) {
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
        showError('Invalid file type. Please upload PDF, DOCX, or TXT files.');
        return;
    }
    
    // Validate file size (16MB)
    if (file.size > 16 * 1024 * 1024) {
        showError('File too large. Maximum size is 16MB.');
        return;
    }
    
    // Store file
    if (fileNumber === 1) {
        state.file1 = file;
    } else {
        state.file2 = file;
    }
    
    // Update UI
    showFilePreview(file, fileNumber);
    
    // Upload file
    await uploadFile(file, fileNumber);
}

async function uploadFile(file, fileNumber) {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch(`${API_BASE}/api/upload`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            if (fileNumber === 1) {
                state.file1Path = data.filepath;
            } else {
                state.file2Path = data.filepath;
            }
        } else {
            throw new Error(data.error || 'Upload failed');
        }
    } catch (error) {
        showError(`Upload failed: ${error.message}`);
        removeFile(fileNumber);
    }
}

function showFilePreview(file, fileNumber) {
    const uploadArea = document.getElementById(`uploadArea${fileNumber}`);
    const uploadContent = uploadArea.querySelector('.upload-content');
    const filePreview = document.getElementById(`filePreview${fileNumber}`);
    
    // Hide upload content, show preview
    uploadContent.style.display = 'none';
    filePreview.style.display = 'flex';
    
    // Update preview info
    filePreview.querySelector('.file-name').textContent = file.name;
    filePreview.querySelector('.file-size').textContent = formatFileSize(file.size);
}

function removeFile(fileNumber) {
    const uploadArea = document.getElementById(`uploadArea${fileNumber}`);
    const uploadContent = uploadArea.querySelector('.upload-content');
    const filePreview = document.getElementById(`filePreview${fileNumber}`);
    
    // Show upload content, hide preview
    uploadContent.style.display = 'block';
    filePreview.style.display = 'none';
    
    // Clear state
    if (fileNumber === 1) {
        state.file1 = null;
        state.file1Path = null;
        document.getElementById('fileInput1').value = '';
    } else {
        state.file2 = null;
        state.file2Path = null;
        document.getElementById('fileInput2').value = '';
    }
}

// ============================================
// Document Processing
// ============================================

async function processDocument() {
    const btn = document.getElementById('processBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    
    // Validate inputs
    if (!state.file1Path) {
        showError('Please upload a document first.');
        return;
    }
    
    if (state.task === 'compare' && !state.file2Path) {
        showError('Please upload a second document for comparison.');
        return;
    }
    
    if ((state.task === 'extract' || state.task === 'qa')) {
        const query = document.getElementById('queryInput').value.trim();
        if (!query) {
            showError('Please enter a query for this task.');
            return;
        }
    }
    
    // Show loading state
    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    
    try {
        const payload = {
            task: state.task,
            language: state.language,
            document_1: state.file1Path,
            document_2: state.file2Path,
            query: document.getElementById('queryInput').value.trim() || undefined
        };
        
        const response = await fetch(`${API_BASE}/api/process`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayResults(data.result);
        } else {
            throw new Error(data.error || 'Processing failed');
        }
    } catch (error) {
        showError(`Processing failed: ${error.message}`);
    } finally {
        // Reset button
        btn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

// ============================================
// Results Display
// ============================================

function displayResults(result) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsContent = document.getElementById('resultsContent');
    
    // Format output
    let formattedOutput = result.output;
    
    // Convert line breaks to HTML
    formattedOutput = formattedOutput.replace(/\n\n/g, '</p><p>');
    formattedOutput = formattedOutput.replace(/\n/g, '<br>');
    
    // Build HTML
    let html = `<div class="output-text"><p>${formattedOutput}</p></div>`;
    
    // Add missing info if present
    if (result.missing_info) {
        html += `
            <div class="missing-info">
                <strong>⚠️ Note:</strong> ${result.missing_info}
            </div>
        `;
    }
    
    resultsContent.innerHTML = html;
    resultsSection.style.display = 'block';
    
    // Smooth scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ============================================
// Utility Functions
// ============================================

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function showError(message) {
    alert(message); // In production, use a nicer toast notification
}

function copyResults() {
    const resultsContent = document.getElementById('resultsContent');
    const text = resultsContent.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('Results copied to clipboard!');
    }).catch(() => {
        showError('Failed to copy results');
    });
}

function downloadResults() {
    const resultsContent = document.getElementById('resultsContent');
    const text = resultsContent.innerText;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dia-results-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function resetForm() {
    // Clear files
    removeFile(1);
    removeFile(2);
    
    // Clear query
    document.getElementById('queryInput').value = '';
    
    // Hide results
    document.getElementById('resultsSection').style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
