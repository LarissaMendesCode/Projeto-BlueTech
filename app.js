const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
//const fetch = require('node-fetch'); 

const app = express();
const port = 3000;

/*
lucasmoreiraproenca159
5WH7kyN7YSRUTrsi
*/
async function connect() {
  if (global.db) return global.db;
  const conn = await MongoClient.connect("mongodb+srv://lucasmoreiraproenca159:5WH7kyN7YSRUTrsi@cluster0.9wubyl6.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
  if (!conn) throw new Error("Can't connect");
  global.db = conn.db("Logins");
  return global.db;
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

/*/ GET dog
router.get('/dog', async (req, res) => {
  try {
    const { default: fetch } = await import('node-fetch');
    const apidog = await fetch('https://dog.ceo/api/breed/hound/list');
    res.json(await apidog.json());
  } catch (ex) {
    console.log(ex);
    res.status(400).json({ error: `${ex}` });
  }
});
*/
// GET Logins by ID or all
router.get('/Logins/:id?', async (req, res) => {
  try {
    const db = await connect();
    if (req.params.id) {
      const result = await db.collection("Logins").findOne({ _id: new ObjectId(req.params.id) });
      res.json(result);
    } else {
      const results = await db.collection("Logins").find().toArray();
      res.json(results);
    }
  } catch (ex) {
    console.log(ex);
    res.status(400).json({ error: `${ex}` });
  }
});

// POST /Logins
router.post('/Logins', async (req, res) => {
  try {
    const Logins = req.body;
    const db = await connect();
    const result = await db.collection("Logins").insertOne(Logins);
    res.json(result);
  } catch (ex) {
    console.log(ex);
    res.status(400).json({ error: `${ex}` });
  }
});

// PUT /Logins/{id}
router.put('/Logins/:id', async (req, res) => {
  try {
    const Logins = req.body;
    const db = await connect();
    const result = await db.collection("Logins").updateOne({ _id: new ObjectId(req.params.id) }, { $set: Logins });
    res.json(result);
  } catch (ex) {
    console.log(ex);
    res.status(400).json({ error: `${ex}` });
  }
});

// DELETE /Logins/{id}
router.delete('/Logins/:id', async (req, res) => {
  try {
    const db = await connect();
    const result = await db.collection("Logins").deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (ex) {
    console.log(ex);
    res.status(400).json({ error: `${ex}` });
  }
});

app.use('/', router);

app.listen(port, () => {
  console.log(`API funcionando na porta ${port}!`);
});
