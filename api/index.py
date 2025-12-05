"""
Vercel Serverless Function Entry Point for DIA
"""

import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from app import app

# Export for Vercel
app = app
