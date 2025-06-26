const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/decode', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Texto ausente.' });

  try {
    const prompt = `Extraia apenas as seguintes informações de forma organizada, objetiva e sem repetir termos desnecessários:

- Exame solicitado
- Indicação clínica

Ignore o restante do texto. Limite a resposta a no máximo 5 linhas.
Texto: """${text}"""`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.3,
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt]()
