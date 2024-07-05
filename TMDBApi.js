import express from 'express';
import api from './api/api.js';
import dotenv from 'dotenv';
import movie from './endpoints/movies.js';
import tv from './endpoints/tv.js';
import people from './endpoints/people.js';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config();

const app = express();
const port = 3000;
const KEY = process.env.KEY;

app.use("/api", express.static(path.join(__dirname, "public")));

app.use('/api/movies', movie)

app.use('/api/tv', tv)

app.use('/api/people', people)

app.get('/api/trending/:type', async (req, res) => {
    const media_type = req.params.type
    const time_window = req.query.time_window

    res.send(await api.getTrending(time_window, media_type));

})

app.get('/api/health', async (req, res) => {
    res.send(await api.health() ? 'Api funcional' : 'Api caida');

} )

app.listen(port, () => {
    console.log("Escuchando en el puerto", port)
})