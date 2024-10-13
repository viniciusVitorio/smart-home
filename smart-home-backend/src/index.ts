import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

//iniciar servidor.
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", //URL do Front-End React
        methods: ["GET","POST"],
    }
});

//Iniciar Servidor 
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


