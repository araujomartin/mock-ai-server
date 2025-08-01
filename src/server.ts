import { Hono } from 'hono';
import { config } from 'dotenv';

config();

const app = new Hono();

const PORT = 3000;

export default {
    port: PORT,
    fetch: app.fetch
}
