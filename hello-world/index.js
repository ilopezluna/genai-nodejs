const {GenericContainer} = require("testcontainers");
const axios = require('axios');

const main = async () => {
    try {
        console.log('Downloading Large Language Model, this may take a while...');
        const container = await new GenericContainer("langchain4j/ollama-orca-mini")
            .withExposedPorts(11434)
            .start();

        const url = `http://localhost:${container.getMappedPort(11434)}/api/generate`;
        const data = {
            model: "orca-mini",
            prompt: "Hello world!",
            stream: false
        };

        console.log('Waiting for model answer, this may take a while depending on the model size and your hardware...');
        const response = await axios.post(url, data);
        console.log(`🤖${response.data.response}`);

        await container.stop();
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

main();