import { Hono } from "hono";
import { getLLMStrategy } from "../llm.factory";

export const generateMock = new Hono();

generateMock.post("/", async (context) => {
    const { schema, count } = await context.req.json();

    if (!schema) {
        return context.json({ error: "Missing schema" }, 400);
    }

    const strategy = getLLMStrategy();


    const prompt = `Generate mock data in JSON format following this schema: ${JSON.stringify(
        schema
    )}, it's important that the response is a valid JSON object without any additional text or explanations, if there is a
    count number return an array. The count is: ${count || 'undefined'}`;

    try {
        const result = await strategy.generate(prompt);
        return context.json({ data: JSON.parse(result) });
    } catch (e: any) {
        console.error(e);
        return context.json({ error: e.message }, 500);
    }
});
