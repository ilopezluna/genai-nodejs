const axios = require('axios');
const {OllamaContainer} = require("@testcontainers/ollama");

const main = async () => {
    try {
        console.log('Downloading Large Language Model, this may take a while...');
        const container = await new OllamaContainer().start();

        await container.exec(['apt', 'install', 'wget', '-y']);
        await container.exec(['wget', 'https://huggingface.co/CompendiumLabs/bge-small-en-v1.5-gguf/resolve/main/bge-small-en-v1.5-q4_k_m.gguf']);
        await container.exec(["sh", "-c", `echo FROM bge-small-en-v1.5-q4_k_m.gguf > Modelfile`]);
        await container.exec(['ollama', 'create', 'bge-small-en-v1.5-gguf', '-f', 'Modelfile']);

        const url = `${container.getEndpoint()}/api/embeddings`;
        const data = {
            model: "bge-small-en-v1.5-gguf",
            prompt: "Hello from Testcontainers!",
        };

        console.log('Waiting for model answer, this may take a while depending on the model size and your hardware...');
        const response = await axios.post(url, data);
        console.log(`Response from LLM (🤖)-> ${response.data.embedding}`);
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

main();