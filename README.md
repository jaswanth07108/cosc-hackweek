# 📄 Ask Your Documents

An AI-powered Document Question Answering System built for COSC HackWeek.

## Features

- Upload PDF documents
- Extract text from PDFs
- Ask questions in natural language
- AI answers using the uploaded document
- Powered by Groq Llama 3.3

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Multer
- pdf-parse
- Groq SDK

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Install backend dependencies

```bash
cd server
npm install
```

### Create a `.env` file

```env
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

### Start the server

```bash
npm run dev
```

### Run the frontend

Open `client/index.html` using Live Server.

## Project Structure

```
client/
server/
README.md
```