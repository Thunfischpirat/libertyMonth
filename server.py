#!/usr/bin/env python3
"""
Simple HTTP server for the Liberty Month Profile Picture Generator.
Run this to avoid CORS issues when loading images.
"""

import http.server
import os
import socketserver
import sys
import webbrowser


def main():
    """Start a local HTTP server for the website."""
    
    port = 8000
    handler = http.server.SimpleHTTPRequestHandler
    
    # Change to script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print(f"🚀 Liberty Month Profile Picture Generator")
            print(f"📡 Server running at: http://localhost:{port}")
            print(f"📂 Serving from: {script_dir}")
            print(f"🌐 Opening browser...")
            print(f"⏹️  Press Ctrl+C to stop the server")
            
            # Open browser automatically
            webbrowser.open(f"http://localhost:{port}")
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\n✅ Server stopped!")
        sys.exit(0)
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {port} is already in use!")
            print(f"💡 Try: http://localhost:{port}")
            print(f"💡 Or kill the process using that port")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 