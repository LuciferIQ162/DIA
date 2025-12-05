"""
Vercel Serverless Function Entry Point for DIA
"""

import sys
import os

# Add parent directory to path to import modules
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

# Import Flask app
from app import app

# This is required for Vercel
# The app variable is what Vercel looks for
