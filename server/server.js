const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let carrinho = [];

app.get('/carrinho', (req, res) => {
  res.json(carrinho);
});

app.post('/carrinho', (req, res) => {
  const { produto } = req.body;
  carrinho.push(produto);
  res.json({ mensagem: 'Produto adicionado!' });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
