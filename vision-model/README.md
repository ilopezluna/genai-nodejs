# Vision model

This is a simple example of how to use a vision model to recognize images in a NodeJS application.

The project contains a single NodeJS script, [index.js](index.js), that uses
the [moondream](https://ollama.com/library/moondream) model to generate text based on an image in base64.
The model runs locally inside [Ollama](https://ollama.com/) and Ollama runs in a container managed
by [Testcontainers](https://www.testcontainers.com/).