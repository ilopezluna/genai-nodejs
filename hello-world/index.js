const axios = require('axios');
const {OllamaContainer} = require("@testcontainers/ollama");

const main = async () => {
    try {
        console.log('Downloading Large Language Model, this may take a while...');
        const container = await new OllamaContainer("langchain4j/ollama-orca-mini").start();
        const url = `${container.getEndpoint()}/api/generate`;
        const data = {
            model: "orca-mini",
            prompt: "Hello world!",
            stream: false
        };

        console.log('Waiting for model answer, this may take a while depending on the model size and your hardware...');
        const response = await axios.post(url, data);
        console.log(`🤖${response.data.response}`);
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

main();