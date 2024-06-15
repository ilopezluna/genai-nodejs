# REST chat

This is a simple example of how to interact via REST with a chatbot model.

The project contains a single NodeJS script, [index.js](index.js), that uses
the [orca-mini](https://ollama.com/library/orca-mini) model to generate text based on a prompt.
The model runs locally inside [Ollama](https://ollama.com/) and Ollama runs in a container managed
by [Testcontainers](https://www.testcontainers.com/).