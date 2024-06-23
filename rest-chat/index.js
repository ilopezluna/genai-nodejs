const express = require('express')
const {post} = require("axios");
const {OllamaContainer} = require("@testcontainers/ollama");
const app = express()
const port = 3000
let container;

const main = async () => {
    try {
        console.log('Downloading Large Language Model, this may take a while...');
        container = await new OllamaContainer("langchain4j/ollama-orca-mini").start();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
            console.log(`Visit http://localhost:${port}/?prompt=Tell%20me%20something%20interesting`)
        });
    } catch (error) {
        console.error('Error occurred:', error);
    }
};
main();

app.get('/', async (req, res) => {
    const url = `${container.getEndpoint()}/api/generate`;
    const data = {
        model: "orca-mini",
        prompt: req.query.prompt,
        stream: false
    };
    const response = await post(url, data);
    res.send(`Response from LLM (🤖)-> ${response.data.response}`)
});