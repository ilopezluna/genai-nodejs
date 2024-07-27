const axios = require('axios');
const {OllamaContainer} = require("@testcontainers/ollama");

// Simulates an API call to get flight times
// In a real application, this would fetch data from a live database or API
function getFlightTimes(departure, arrival) {
    const flights = {
        "NYC-LAX": {departure: "08:00 AM", arrival: "11:30 AM", duration: "5h 30m"},
        "LAX-NYC": {departure: "02:00 PM", arrival: "10:30 PM", duration: "5h 30m"},
        "LHR-JFK": {departure: "10:00 AM", arrival: "01:00 PM", duration: "8h 00m"},
        "JFK-LHR": {departure: "09:00 PM", arrival: "09:00 AM", duration: "7h 00m"},
        "CDG-DXB": {departure: "11:00 AM", arrival: "08:00 PM", duration: "6h 00m"},
        "DXB-CDG": {departure: "03:00 AM", arrival: "07:30 AM", duration: "7h 30m"}
    };

    const key = `${departure}-${arrival}`.toUpperCase();
    return JSON.stringify(flights[key] || {error: "Flight not found"});
}

const main = async () => {
    console.log('Downloading Large Language Model, this may take a while...');
    const container = await new OllamaContainer("ilopezluna/ollama-mistral:0.3.0-7b").start();
    const messages = [{role: 'user', content: 'What is the flight time from New York (NYC) to Los Angeles (LAX)?'}];
    const url = `${container.getEndpoint()}/api/chat`;
    const data = {
            model: "mistral:7b",
            messages,
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'get_flight_times',
                        description: 'Get the flight times between two cities',
                        parameters: {
                            type: 'object',
                            properties: {
                                departure: {
                                    type: 'string',
                                    description: 'The departure city (airport code)',
                                },
                                arrival: {
                                    type: 'string',
                                    description: 'The arrival city (airport code)',
                                },
                            },
                            required: ['departure', 'arrival'],
                        },
                    },
                },
            ],
            stream: false
        };
    console.log('Waiting for model answer, this may take a while depending on the model size and your hardware...');
    const response = await axios.post(url, data);

    // Add the model's response to the conversation history
    const responseMessage = response.data.message;
    messages.push(responseMessage);

    // Check if the model decided to use the provided function
    if (!responseMessage.tool_calls || responseMessage.tool_calls.length === 0) {
        console.log("The model didn't use the function. Its response was:");
        console.log(responseMessage.content);
        return;
    }

    // Process function calls made by the model
    if (responseMessage.tool_calls) {
        const availableFunctions = {
            get_flight_times: getFlightTimes,
        };
        for (const tool of responseMessage.tool_calls) {
            const functionToCall = availableFunctions[tool.function.name];
            if (functionToCall) {
                console.log(`(🤖) -> Calling function ${tool.function.name} with arguments: ${JSON.stringify(tool.function.arguments)}`);
            }
            const functionResponse = functionToCall(
                tool.function.arguments.departure,
                tool.function.arguments.arrival
            );
            // Add function response to the conversation
            messages.push({
                role: 'tool',
                content: functionResponse,
            });
        }
    }

    // Second API call: Get final response from the model
    const finalResponse = await axios.post(url, {
        model: "mistral:7b",
        messages,
        stream: false
    });
    console.log(`Response from LLM (🤖)-> ${finalResponse.data.message.content}`)
};

main();