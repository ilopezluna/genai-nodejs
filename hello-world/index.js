const axios = require('axios');
const {OllamaContainer} = require("@testcontainers/ollama");

const main = async () => {
    console.log('Downloading Large Language Model, this may take a while...');
    const container = await new OllamaContainer("ilopezluna/ollama-orca-mini:0.2.8-3b").start();
    const url = `${container.getEndpoint()}/api/generate`;
    const data = {
        model: "orca-mini:3b",
        prompt: "Hello world!",
        stream: false
    };

    console.log('Waiting for model answer, this may take a while depending on the model size and your hardware...');
    const response = await axios.post(url, data);
    console.log(`Response from LLM (🤖)-> ${response.data.response}`);
};

main();