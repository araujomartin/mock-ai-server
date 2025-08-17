import type { LLMStrategy } from "./llm.strategy"

const model = process.env.LLM_MODEL || 'gpt-3.5-turbo'
const apiKey = process.env.LLM_API_KEY

export class OpenAIStrategy implements LLMStrategy {
    async generate(prompt: string): Promise<string> {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model,
                messages: [
                    { 
                        role: 'system',
                        content: 'You are a JSON mock data generator based on JSON Schema.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        })
        const data = await response.json()
        return data.choices[0].message.content
    }
}
