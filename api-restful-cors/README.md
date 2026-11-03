# API RESTful de sensores con CORS (Parte 1 de la Práctica 7)

Esta carpeta es una **referencia** de la API de la práctica anterior (Base de Datos Documentales) con CORS ya habilitado.

## Si ya tienes tu repositorio de la práctica anterior

Solo necesitas dos cambios en tu propio proyecto:

1. Instalar la dependencia:

   ```bash
   npm install cors
   ```

2. En `index.js`, después de la configuración del API RESTful y antes de la configuración de la base de datos:

   ```js
   // configuración del API RESTful
   const express = require("express");
   const app = express();
   const port = 3000;

   // configuración CORS
   var cors = require("cors");
   app.use(cors());
   // configuración a la base de datos
   const MongoClient = require("mongodb").MongoClient;
   let ObjectId = require("mongodb").ObjectID;
   ```

   > Si tu proyecto usa el driver `mongodb` 4.x o superior, la clase se llama `ObjectId` (con "d" minúscula); `ObjectID` solo existe en la 3.x.

Luego inicia el servidor (`node index.js` o `npm start`), en la pestaña **Ports** pon el puerto 3000 en **Public** y copia la **Forwarded Address** para el cliente web.

## Si quieres usar esta API de referencia

```bash
npm install
MONGO_URI="mongodb+srv://usuario:clave@cluster.mongodb.net" npm start
```

- `MONGO_URI`: cadena de conexión (por defecto `mongodb://localhost:27017`).
- `MONGO_DB`: nombre de la base de datos (por defecto `iot`). Colección: `sensores`.

| Método | Ruta              | Respuesta                         |
|--------|-------------------|-----------------------------------|
| GET    | `/sensores`       | 200 – arreglo de sensores         |
| GET    | `/sensores/:id`   | 200 – sensor / 404                |
| POST   | `/sensores`       | 201 – `{ _id, nombre }`           |
| PUT    | `/sensores/:id`   | 200 – sensor actualizado / 404    |
| DELETE | `/sensores/:id`   | 204 / 404                         |
