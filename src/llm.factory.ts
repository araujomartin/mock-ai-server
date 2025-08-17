// llm.factory.ts
import type { LLMStrategy } from "./services/strategies/llm.strategy";
import { OpenAIStrategy } from "./services/strategies/openai.strategy";


export function getLLMStrategy(): LLMStrategy {
    const provider = process.env.LLM_PROVIDER;

    switch (provider) {
        case "openai":
            return new OpenAIStrategy();
        // case "gemini": return new GeminiStrategy();
        // case "anthropic": return new AnthropicStrategy();
        default:
            throw new Error(`Unknown LLM provider: ${provider}`);
    }
}
