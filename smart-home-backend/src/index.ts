import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();

// Habilitar CORS para todas as origens
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Porta do frontend
    methods: ["GET", "POST"],
  },
});

// Definindo o estado inicial dos dispositivos
let dispositivos = {
  salaDeEstar: {
    luzes: false,
    tv: { 
        ligada: false, 
        canal: 1 
    },
    arCondicionado: { 
        ligado: false, 
        temperatura: 24 
    },
  },
  cozinha: {
    luzes: false,
    geladeira: { 
        temperatura: 4, 
        alerta: false 
    },
    fogao: { 
        ligado: false, 
        potencia: 1 
    },
  },
  quarto: {
    luzes: false,
    ventilador: { 
        ligado: false, 
        velocidade: 1 
    },
    cortinas: 'fechadas',
  },
};

io.on('connection', (socket: Socket) => {
  console.log('Cliente conectado:', socket.id);
  socket.emit('estadoInicial', dispositivos);
  socket.on('mudancaEstadoDispositivo', (novoEstado) => {
    dispositivos = { ...dispositivos, ...novoEstado };
    io.emit('atualizarEstado', dispositivos);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});
