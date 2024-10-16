# Sistema de Controle de Casa Inteligente

Este projeto simula o controle de dispositivos em uma casa inteligente, onde os usuários podem gerenciar diferentes dispositivos em três cômodos: **Sala de Estar**, **Cozinha**, e **Quarto**. A interface é construída com **React** e **Tailwind CSS**, e a comunicação em tempo real com o servidor é feita usando **WebSockets**.

## Funcionalidades

- **Sala de Estar**:
  - Controlar luzes, TV, e ar-condicionado.
  - Ajustar canal da TV e temperatura do ar-condicionado.

- **Cozinha**:
  - Controlar luzes, geladeira, e fogão.
  - Ajustar temperatura da geladeira e potência do fogão.

- **Quarto**:
  - Controlar luzes, ventilador, e cortinas.
  - Ajustar a velocidade do ventilador e abrir/fechar cortinas.

## Tecnologias Utilizadas

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  - Socket.io (para WebSockets)

- **Backend**:
  - Node.js com Socket.io para gerenciar a comunicação em tempo real.

## Como Rodar o Projeto

### Pré-requisitos

- Ter **Node.js** instalado na máquina. Você pode baixá-lo [aqui](https://nodejs.org/).

### Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/viniciusVitorio/smart-home.git
   cd smart-home
   ```

#### Backend

2. Instale as dependencias:

   ```bash
    cd smart-home-backend/
    npm install
   ```

3. Inicie o servidor:

   ```bash
    npm run start
   ```

O servidor WebSocket estará rodando em http://localhost:4000.

#### Frontend

2. Instale as dependencias:

   ```bash
    cd smart-home-frontend/
    npm install
   ```

3. Inicie o servidor:

   ```bash
    npm run dev
   ```

Agora é só acessar o http://localhost:5173/ para visualizar o projeto.