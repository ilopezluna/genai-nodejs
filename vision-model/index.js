const axios = require('axios');
const {readFileSync} = require("node:fs");
const {OllamaContainer} = require("@testcontainers/ollama");

const main = async () => {
    console.log('Downloading Large Language Model, this may take a while...');
    const container = await new OllamaContainer("ilopezluna/ollama-moondream:0.2.8-1.8b").withReuse().start();
    const base64Image = readFileSync('whale.jpeg', 'base64');
    const url = `${container.getEndpoint()}/api/generate`;
    const data = {
        model: "moondream:1.8b",
        prompt: "Describe the image",
        images: [base64Image],
        stream: false
    };

    console.log('Waiting for model answer, this may take a while depending on the model size and your hardware...');
    const response = await axios.post(url, data);
    console.log(`Response from LLM (🤖)-> ${response.data.response}`);
};

main();