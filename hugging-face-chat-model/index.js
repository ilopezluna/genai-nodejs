const axios = require('axios');
const {OllamaContainer} = require("@testcontainers/ollama");

const main = async () => {
    console.log('Downloading Large Language Model, this may take a while...');
    const imageName = "chat-model-from-hf";
    const model = "distilabelorca-tinyllama-1.1b.Q8_0.gguf";
    const container = await huggingFaceContainer(imageName, model);
    const url = `${container.getEndpoint()}/api/chat`;
    const data = {
        model,
        messages: [{"role": "user", "content": "What is the capital of France?"}],
        stream: false
    };

    console.log('Waiting for model answer, this may take a while depending on the model size and your hardware...');
    const response = await axios.post(url, data);
    console.log(`Response from LLM (🤖)-> ${response.data.message.content}`);
};

const huggingFaceContainer = async (imageName, model) => {
    try {
        return await new OllamaContainer(imageName).start();
    } catch (e) {
        console.log('Creating image...');
        await createImage(imageName, model);
        return await new OllamaContainer(imageName).start();
    }
}

const createImage = async (imageName, model) => {
    const container = await new OllamaContainer().start();
    await container.exec(['apt', 'install', 'wget', '-y']);
    await container.exec(['wget', `https://huggingface.co/DavidAU/DistiLabelOrca-TinyLLama-1.1B-Q8_0-GGUF/resolve/main/${model}`]);
    await container.exec(["sh", "-c", `echo FROM ${model} > Modelfile`]);
    await container.exec(['ollama', 'create', model, '-f', 'Modelfile']);
    await container.commitToImage(imageName);
}

main();