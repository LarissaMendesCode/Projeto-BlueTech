const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const cadastro = mongoose.model('cadastro', {
  nome: String,
  email: String,
  senha: String
});

app.get("/", async (req, res) => {
    const cadastros = await cadastro.find()
  return res.send(cadastros)
});

app.post('/', async (req, res) => {
  const novoCadastro = new cadastro({ 
    nome: req.body.nome, 
    email: req.body.email, 
    senha: req.body.senha 
});

  await novoCadastro.save();
  return res.send(novoCadastro);
  })

app.put('/:id', async (req, res) => {
  const cadastros = await cadastro.findByIdAndUpdate(req.params.id, {
    nome: req.body.nome, 
    email: req.body.email, 
    senha: req.body.senha 
  },{
    new:true
  });
  
    return res.send(cadastros);
    })
  

app.delete("/:id", async (req, res) => {
  const cadastros = await cadastro.findByIdAndRemove(req.params.id);
  return res.send(cadastros); 
})

app.listen(port, () => {
  mongoose.connect();
  console.log(`API funcionando na porta ${port}!`);
})
