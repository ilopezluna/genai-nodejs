const express = require('express')
const {post} = require("axios");
const {OllamaContainer} = require("@testcontainers/ollama");
const app = express()
const port = 3000
let container;

const main = async () => {
    console.log('Downloading Large Language Model, this may take a while...');
    container = await new OllamaContainer("ilopezluna/ollama-orca-mini:0.2.8-3b").withReuse().start();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
        console.log(`Visit http://localhost:${port}/api/chat?prompt=${encodeURIComponent("Greetings!")}`)
    });
};
main();

app.get('/api/chat', async (req, res) => {
    const url = `${container.getEndpoint()}/api/chat`;
    const data = {
        model: "orca-mini:3b",
        messages: [
            {role: "assistant", content: "What is your name?"},
            {role: "user", content: "My name is Ignasi"},
            {role: "user", content: req.query.prompt}
        ],
        stream: false
    };
    const response = await post(url, data);
    res.send(`Response from LLM (🤖)-> ${response.data.message.content}`)
});