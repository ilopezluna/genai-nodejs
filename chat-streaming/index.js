const axios = require('axios');
const {OllamaContainer} = require("@testcontainers/ollama");
const {createInterface} = require("node:readline");

const main = async () => {
    console.log('Downloading Large Language Model, this may take a while...');
    const container = await new OllamaContainer("ilopezluna/ollama-qwen2:0.2.8-0.5b").withReuse().start();
    const url = `${container.getEndpoint()}/api/chat`;
    const conversation = [];

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.setPrompt('>> ');
    rl.prompt();
    rl.on('line', async (line) => {
        if (line === 'exit') {
            rl.close();
            process.exit(0);
        }
        await sendMessage(line);
        rl.prompt();
    });

    async function sendMessage(content) {
        conversation.push({role: "user", content: content});
        const data = {
            model: "qwen2:0.5b",
            messages: conversation,
            stream: true
        };

        const response = await axios.post(url, data, {responseType: 'stream'});
        const stream = response.data;
        let responseMessage = "";
        stream.on('data', (chunk) => {
            const messageChunk = JSON.parse(chunk).message.content;
            process.stdout.write(messageChunk);
            responseMessage = responseMessage + messageChunk;
        });
        await new Promise((resolve) => {
            stream.on('end', () => {
                conversation.push({role: "assistant", content: responseMessage});
                process.stdout.write('\n>> ');
                resolve();
            });
        });
    }
};

main();