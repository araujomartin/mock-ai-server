import { Hono } from 'hono';
import { config } from 'dotenv';
import { generateMock } from './routes/generate-mock';

config();

const app = new Hono();

const PORT = 3000;

app.route("/mock", generateMock);

export default {
    port: PORT,
    fetch: app.fetch
}
