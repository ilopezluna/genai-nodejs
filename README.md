# GenAI NodeJS

This is an educational project that demonstrates how to use Large Language Models (LLMs) in NodeJS applications.
The project contains subdirectories with examples of how to use LLMs in different scenarios.
The LLMs will run locally inside [Ollama](https://ollama.com/) and Ollama will run in a [Docker](https://docker.com/)
container managed by [Testcontainers](https://www.testcontainers.com/).

## Table of Contents

1. [Hello World](hello-world/README.md)
2. [REST Chat](rest-chat/README.md)
3. [Vision Model](vision-model/README.md)
4. [Embedding model from Hugging Face](hugging-face-embedding-model/README.md)

## Requirements

- NodeJS
- npm
- Docker

## Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/ilopezluna/genai-nodejs.git
    ```
2. Change into the directory of the example you want to run:

    ```bash
    cd hello-world
    ```
3. Install the dependencies:

    ```bash
    npm install
    ```
4. Run the script:

    ```bash
    npm start
    ```

## Questions/Answers

- **Q:** Why do I need Ollama
  **A:** Ollama allows you to run Large Language Models (LLMs) locally without the need for an internet connection. It
  provides a simple API for interacting with the models.
- **Q:** Why do I need Docker?
  **A:** Docker is used to run the Ollama container. This ensures that the model runs in a consistent and isolated
  environment.
- **Q:** Why do I need Testcontainers?
  **A:** Testcontainers is used to manage the lifecycle of the Docker container running the model. It ensures that the
  container is started before the script runs and stopped after the script finishes.
  **A:** Testcontainers provides programmatic control over Docker containers from within the code.
- **Q:** Why does it take such a long time to run the script?
  **A:** The first time you run the script, it will download the Docker image for the model, which can take some time
  depending on your internet connection speed. Subsequent runs will be faster as the image will be cached locally.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.