# Hello World

This is a simple example of how to use Large Language Models (LLMs) to generate text.

The project contains a single NodeJS script, [index.js](index.js), that uses
the [orca-mini](https://ollama.com/library/orca-mini) model to generate text based on a prompt.
The model runs locally inside [Ollama](https://ollama.com/) and Ollama runs in a container managed
by [Testcontainers](https://www.testcontainers.com/).

## Requirements

- Node.js
- npm
- Docker

## Instructions

1. Clone the repository:

```bash
git clone https://github.com/ilopezluna/genai-nodejs
cd genai-nodejs/hello-world/
```

2. Install the dependencies:

```bash
npm install ci
```

3. Run the script:

```bash
npm start
```

## Questions/Answers

- **Q:** Why do I need Docker?
  **A:** The model runs inside a Docker container managed by Testcontainers. Docker is required to run the container
  locally.
- **Q:** Why do I need Testcontainers?
  **A:** Testcontainers is used to manage the lifecycle of the Docker container running the model. It ensures that the
  container is started before the script runs and stopped after the script finishes.
  **A:** Testcontainers provides programmatic control over Docker containers from within the code.
- **Q:** Why do I need Ollama
  **A:** Ollama allows you to run Large Language Models (LLMs) locally without the need for an internet connection. It
  provides a simple API for interacting with the models.
- **Q:** Why does it take such a long time to run the script?
  **A:** The first time you run the script, it will download the Docker image for the model, which can take some time
  depending on your internet connection speed. Subsequent runs will be faster as the image will be cached locally.