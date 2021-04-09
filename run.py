from app import create_app

app = create_app()

@app.route('/', methods=['GET'])
def index():
        return 'Hello World!'
        
if __name__ == '__main__':
    app.run('localhost', port=5000, debug=True)
