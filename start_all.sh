#!/bin/bash

##############################################################################
# Document Intelligence Agent (DIA) - Startup Script
# This script handles environment checks and starts the Flask server
##############################################################################

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║  Document Intelligence Agent (DIA) - Startup Script  ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

##############################################################################
# Environment Checks
##############################################################################

check_python() {
    print_info "Checking Python installation..."
    
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed!"
        print_info "Please install Python 3.8 or higher: https://www.python.org/downloads/"
        exit 1
    fi
    
    PYTHON_VERSION=$(python3 --version | awk '{print $2}')
    print_success "Python $PYTHON_VERSION found"
}

check_pip() {
    print_info "Checking pip installation..."
    
    if ! command -v pip3 &> /dev/null; then
        print_error "pip3 is not installed!"
        print_info "Installing pip..."
        python3 -m ensurepip --upgrade
    fi
    
    print_success "pip is available"
}

check_dependencies() {
    print_info "Checking required dependencies..."
    
    if [ ! -f "requirements.txt" ]; then
        print_error "requirements.txt not found!"
        exit 1
    fi
    
    # Check if all dependencies are installed
    if ! python3 -c "import flask, flask_cors, dotenv, openai, PyPDF2, docx" &> /dev/null; then
        print_warning "Some dependencies are missing"
        print_info "Installing dependencies from requirements.txt..."
        pip3 install -r requirements.txt
        print_success "Dependencies installed"
    else
        print_success "All dependencies are installed"
    fi
}

check_env_file() {
    print_info "Checking environment configuration..."
    
    if [ ! -f ".env" ]; then
        print_error ".env file not found!"
        
        if [ -f ".env.example" ]; then
            print_info "Creating .env from .env.example..."
            cp .env.example .env
            print_warning "Please configure your API keys in .env file"
            print_info "Opening .env file for editing..."
            open .env || nano .env || vi .env
            
            read -p "Press Enter after configuring .env file to continue..."
        else
            print_error ".env.example not found either!"
            exit 1
        fi
    fi
    
    # Check if OPENAI_API_KEY is set
    if ! grep -q "OPENAI_API_KEY=sk-" .env 2>/dev/null; then
        print_warning "OPENAI_API_KEY may not be configured properly in .env"
        print_info "Make sure to set your API key before using the application"
    else
        print_success "Environment file configured"
    fi
}

check_directories() {
    print_info "Checking required directories..."
    
    # Create uploads directory if it doesn't exist
    if [ ! -d "uploads" ]; then
        mkdir -p uploads
        print_success "Created uploads directory"
    else
        print_success "uploads directory exists"
    fi
    
    # Check static directory
    if [ ! -d "static" ]; then
        print_error "static directory not found!"
        exit 1
    fi
    
    print_success "All required directories present"
}

check_files() {
    print_info "Checking required files..."
    
    REQUIRED_FILES=("app.py" "agent.py" "config.json" "static/index.html" "static/css/style.css" "static/js/app.js")
    
    for file in "${REQUIRED_FILES[@]}"; do
        if [ ! -f "$file" ]; then
            print_error "Required file not found: $file"
            exit 1
        fi
    done
    
    print_success "All required files present"
}

##############################################################################
# Start Application
##############################################################################

check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1  # Port in use
    else
        return 0  # Port available
    fi
}

find_available_port() {
    local start_port=5000
    local max_port=5100
    
    for port in $(seq $start_port $max_port); do
        if check_port $port; then
            echo $port
            return 0
        fi
    done
    
    echo 8080  # Fallback port
    return 0
}

start_server() {
    print_info "Starting Document Intelligence Agent..."
    echo ""
    
    # Set default environment variables if not set
    export FLASK_ENV=${FLASK_ENV:-development}
    local DEFAULT_PORT=${FLASK_PORT:-5000}
    
    # Check if default port is available
    if ! check_port $DEFAULT_PORT; then
        print_warning "Port $DEFAULT_PORT is already in use"
        print_info "Finding available port..."
        
        AVAILABLE_PORT=$(find_available_port)
        export FLASK_PORT=$AVAILABLE_PORT
        
        print_success "Found available port: $AVAILABLE_PORT"
    else
        export FLASK_PORT=$DEFAULT_PORT
    fi
    
    print_success "Environment: $FLASK_ENV"
    print_success "Port: $FLASK_PORT"
    echo ""
    
    print_info "🚀 Launching Flask server..."
    print_info "📱 Access the application at: http://localhost:$FLASK_PORT"
    print_info "🛑 Press Ctrl+C to stop the server"
    echo ""
    echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
    echo ""
    
    # Start the Flask application
    python3 app.py
}

##############################################################################
# Main Execution
##############################################################################

main() {
    clear
    print_header
    
    # Run all checks
    check_python
    check_pip
    check_dependencies
    check_env_file
    check_directories
    check_files
    
    echo ""
    echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}All checks passed! Starting application...${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
    echo ""
    
    sleep 1
    
    # Start the server
    start_server
}

# Run main function
main
