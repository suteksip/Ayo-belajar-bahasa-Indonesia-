from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys

def run(port=8080):
    server_address = ('', port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print(f"Server running on port {port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server")
        httpd.socket.close()

if __name__ == '__main__':
    run()
