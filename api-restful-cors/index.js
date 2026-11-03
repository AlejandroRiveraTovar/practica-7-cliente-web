// configuración del API RESTful
const express = require("express");
const app = express();
const port = 3000;

// configuración CORS
var cors = require("cors");
app.use(cors());
// configuración a la base de datos
const MongoClient = require("mongodb").MongoClient;
// Nota: en versiones recientes del driver de MongoDB (4.x en adelante) la clase
// se llama ObjectId; ObjectID solo existía en la versión 3.x.
let ObjectId = require("mongodb").ObjectId;

// Cadena de conexión: usa la variable de entorno MONGO_URI si existe
// (por ejemplo, tu cadena de MongoDB Atlas) o un MongoDB local.
const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGO_DB || "iot";
const client = new MongoClient(uri);
let sensores;

// Permite recibir cuerpos en formato JSON
app.use(express.json());

// Listar todos los sensores
app.get("/sensores", async (req, res) => {
  try {
    const lista = await sensores.find({}).toArray();
    res.status(200).json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Consultar un sensor por id
app.get("/sensores/:id", async (req, res) => {
  try {
    const sensor = await sensores.findOne({ _id: new ObjectId(req.params.id) });
    if (!sensor) return res.status(404).json({ error: "Sensor no encontrado" });
    res.status(200).json(sensor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Crear un sensor
app.post("/sensores", async (req, res) => {
  try {
    const sensor = { nombre: req.body.nombre };
    const result = await sensores.insertOne(sensor);
    res.status(201).json({ _id: result.insertedId, ...sensor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un sensor
app.put("/sensores/:id", async (req, res) => {
  try {
    const result = await sensores.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { nombre: req.body.nombre } }
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Sensor no encontrado" });
    res.status(200).json({ _id: req.params.id, nombre: req.body.nombre });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un sensor
app.delete("/sensores/:id", async (req, res) => {
  try {
    const result = await sensores.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Sensor no encontrado" });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Conecta a la base de datos e inicia el servidor
client
  .connect()
  .then(() => {
    sensores = client.db(dbName).collection("sensores");
    app.listen(port, () => {
      console.log(`API RESTful escuchando en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("No fue posible conectar a MongoDB:", err.message);
    process.exit(1);
  });
