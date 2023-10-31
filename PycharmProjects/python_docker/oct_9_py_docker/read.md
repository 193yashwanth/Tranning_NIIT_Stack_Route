Create a `requirements.txt` file with the following content:

```
Flask==2.0.1
Werkzeug==2.2.2
```

Now, create a file named `app.py` with the following content:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
return "Hello, Docker!"

if __name__ == "__main__":
app.run(host="0.0.0.0", port=5000)
```

**2. Containerize the Python web application:**

Create a `Dockerfile` in the `flask_app` directory with the following content:

```Dockerfile
FROM python:3.8-slim

WORKDIR /app

COPY .. /app

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "app.py"]
```

**3. Build and run the Docker container:**

First, navigate to the `flask_app` directory and build the Docker image:

```bash
docker build -t flask_app_image .
```

After the image has been built, you can run it:

```bash
docker run -p -it 5000:5000 flask_app_image
```

Now, open your browser and visit `http://localhost:5000`. You should see the message "Hello, Docker!"

And that's it! You have successfully created a simple Flask application and containerized it using Docker.

