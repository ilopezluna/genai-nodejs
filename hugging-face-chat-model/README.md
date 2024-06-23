# Hugging Face chat model

This is an example of how you can use Testcontainers to run a Hugging Face model.
In this example, the model to use is more heavy than the ones used in the other examples, so we will use a different
approach to run it.
Instead of downloading it everytime, it will be only downloaded once, and then we will create a new image with the model
already downloaded.
This is useful when you need to run the model multiple times, as it will save time.

Here we have a function that will start a container with the model, if the image doesn't exist it will create it:

```javascript
const huggingFaceContainer = async (imageName, model) => {
    try {
        return await new OllamaContainer(imageName).start();
    } catch (e) {
        console.log('Creating image...');
        await createImage(imageName, model);
        return await new OllamaContainer(imageName).start();
    }
}
```