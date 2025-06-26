const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/decode', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Texto ausente.' });

  try {
    const prompt = `Extraia apenas as seguintes informações de forma organizada, objetiva e sem repetir termos desnecessários:

- Exame solicitado
- Indicação clínica

Ignore o restante do texto. Limite a resposta a no máximo 5 linhas.
Texto: """${text}"""`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      temperature: 0.3,
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    });

    const output = completion.data.choices[0].message.content.trim();
    res.json({ result: output });
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).json({ error: 'Erro ao interpretar pedido.' });
  }
});

app.get('/', (req, res) => {
  res.send('API de interpretação de pedidos médicos ativa.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
