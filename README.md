# Mock AI Server (Beta)

A lightweight local HTTP server (Hono + Bun) that generates mock JSON data with the help of an LLM (currently OpenAI). You provide a JSON Schema, the server returns a realistic JSON object conforming to that schema. Great for seeding UIs and prototyping without building full backends.

> Status: Early beta. API and behavior may change. Use in local/dev environments only.

## Features

- Simple POST endpoint to generate mock data from a JSON Schema
- Pluggable LLM strategy via environment variables (OpenAI supported)
- Bun + Hono for fast local development
- .env-based configuration with a provided `.env.example`

## Requirements

- Bun v1.2+ installed
- An OpenAI API key (if using the default OpenAI provider)

## Getting Started

1) Install dependencies

```bash
bun install
```

2) Configure environment

- Copy `.env.example` to `.env`
- Fill in the required values

Required variables:

- `LLM_PROVIDER` — e.g., `openai`
- `LLM_API_KEY` — your provider API key (for OpenAI, starts with `sk-`)
- `LLM_MODEL` — e.g., `gpt-4o-mini` (recommended) or another supported model

3) Run the server

```bash
bun run src/server.ts
```

By default, the server listens on `http://localhost:3000`.

## API

POST `/mock/`

Body

- `schema` (object, required): A valid JSON Schema describing the object to generate.

Example request

```json
{
  "schema": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "id": { "type": "string" },
      "name": { "type": "string" },
      "age": { "type": "number", "minimum": 18, "maximum": 90 },
      "email": { "type": "string", "format": "email" }
    },
    "required": ["id", "name", "email"]
  }
}
```

Example curl

```bash
curl -s -X POST http://localhost:3000/mock/ \
  -H "Content-Type: application/json" \
  -d @- << 'EOF'
{
  "schema": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "id": { "type": "string" },
      "name": { "type": "string" },
      "age": { "type": "number", "minimum": 18, "maximum": 90 },
      "email": { "type": "string", "format": "email" }
    },
    "required": ["id", "name", "email"]
  }
}
EOF
```

Typical response

```json
{
  "data": {
    "id": "9f1e5b2c-7c44-4b18-9b79-8f8a9d5e0f3a",
    "name": "Jane Doe",
    "age": 29,
    "email": "jane.doe@example.com"
  }
}
```

Errors

- `400` — Missing `schema` in request body
- `500` — Provider or server error

## Project Structure

- `src/server.ts` — Hono app and routing
- `src/routes/generate-mock.ts` — `/mock` route handler
- `src/llm.factory.ts` — selects LLM strategy based on env
- `src/services/strategies/*` — LLM strategy implementations

## Notes & Limitations

- Quality and determinism depend on the chosen model; results may vary.
- JSON Schema support is heuristic via prompts, not a strict validator.
- Intended for local development; do not expose publicly without adding auth/rate limiting.

## Roadmap

- Add more providers (Gemini, Anthropic)
- Stricter schema adherence and better validation
- Deterministic mode with seeds
- Batch generation and arrays
- TypeScript SDK or client helpers

## Troubleshooting

- Make sure `.env` exists and includes a valid `LLM_API_KEY`.
- If requests fail, check your network and provider status/quota.
- Run with verbose logs (temporarily add console logs) if needed.

## License

MIT
