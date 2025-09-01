import { Agent, run } from "@agentai/agents";
import { z } from "zod";

const inputGuarRailAgent = new Agent({
    name: "Input Guardrail Agent",
    instructions: "Check if the user input is related ourshopping website and return the user input if it is related to the our shopping website nothing else",
    outputSchema: z.object({
        isRelatedToShopppingWebsite: z.boolean(),
    }),
})

const checInputGuarRailAgent = {
    name: 'User query Guardrail',
    execute: async ({ input,context }) => {
        const result = await run(inputGuarRailAgent, input);
        return{
            
            tripwire: result.finalOutput.isRelatedToShopppingWebsite ? false : true,
        }
    }
}

const CustomerSupportAgent = new Agent({
    name: "Customer Support Agent",
    instructions: "A customer support agent that can help with customer questions and issues",
    inputGuardrails: [checInputGuarRailAgent],
})

async function runAgent(query = '') {
    const response = await run(CustomerSupportAgent, query);
    console.log(response);
}

runAgent("I have a problem with my account");   