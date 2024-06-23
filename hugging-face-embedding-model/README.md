# Hugging Face Embedding Model

This is an example of how you can use Testcontainers to run a Hugging Face model.

The project contains a single NodeJS script, [index.js](index.js), which initializes a container
running [Ollama](https://ollama.com/).
Once the container is running, the script installs `wget` and downloads a Hugging Face model
in [GGUF](https://huggingface.co/docs/hub/en/gguf) format.
Then it [imports the GGUF into Ollama,](https://github.com/ollama/ollama?tab=readme-ov-file#import-from-gguf) and
finally it uses the model to generate embeddings for a given text.