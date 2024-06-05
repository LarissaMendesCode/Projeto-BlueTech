//app.js
const {MongoClient, ObjectId} = require("mongodb");
async function connect(){
  if(global.db) return global.db;
    const conn = await MongoClient.connect("mongodb+srv://venanciodarko:g$$w7E%40R2*npTBu@blueproject.nzhazel.mongodb.net/");
  if(!conn) return new Error("Can't connect");
    global.db = await conn.db("Logins");
  return global.db;
}

const express = require('express');
const app = express();         
const port = 3000; //porta padrão
const mongoose = require('mongoose');


app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//definindo as rotas
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

// GET dog
router.get('/dog', async function(req, res, next) {
  try{
    const apidog = await fetch('https://dog.ceo/api/breed/hound/list');
    res.json(await apidog.json());
  }
  catch(ex){
    console.log(ex);
    res.status(400).json({erro: `${ex}`});
  }
}) 

/* GET cadastro */
router.get('/Logins/id', async function(req, res, next) {
    try{
      const db = await connect();
      if(req.params.id)
        res.json(await db.collection("Logins").findOne({_id: new ObjectId(req.params.id)}));
      else
        res.json(await db.collection("Logins").find().toArray());
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// POST /cadastro
router.post('/Logins', async function(req, res, next){
    try{
      const Logins = req.body;
      const db = await connect();
      res.json(await db.collection("Logins").insertOne(Logins));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// PUT /cadastro/{id}
router.put('/Logins/:id', async function(req, res, next){
    try{
      const Logins = req.body;
      const db = await connect();
      res.json(await db.collection("Logins").updateOne({_id: new ObjectId(req.params.id)}, {$set: Logins}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// DELETE /cadastro/{id}
router.delete('/Logins/:id', async function(req, res, next){
    try{
      const db = await connect();
      res.json(await db.collection("Logins").deleteOne({_id: new ObjectId(req.params.id)}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');