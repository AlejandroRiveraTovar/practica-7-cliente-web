# practica-7-cliente-web

Cliente web (HTML + Material Design Lite + JavaScript) que consume la API RESTful de sensores de la práctica anterior mediante `fetch`.

## Estructura

```
practica-7-cliente-web/
├── index.html     # Interfaz MDL: listado de sensores y formulario "Agregar sensor"
├── js/
│   └── script.js  # getSensor() (GET), createSensor() (POST) y navegación entre vistas
└── README.md
```

## Configuración

1. En el codespace de la API (práctica anterior) inicia el servidor (`node index.js` o `npm start`).
2. En la pestaña **Ports**, pon el puerto **3000** en visibilidad **Public** y copia la **Forwarded Address**.
3. Abre `js/script.js` y reemplaza el valor de la constante `URL_SERVER` (primera línea) por esa dirección seguida de la ruta del recurso de sensores. Ejemplo:

   ```js
   const URL_SERVER = "https://mi-codespace-abc123-3000.app.github.dev/sensores";
   ```

   Si tu API usa otra ruta (por ejemplo `/sensor`), ajústala aquí.

## Ejecución

En la terminal del codespace de este repositorio:

```bash
python3 -m http.server 8080
```

Abre el puerto 8080 desde la notificación o la pestaña **Ports**.

- **Listado de sensores**: muestra todos los sensores de la base de datos (GET, espera status 200).
- **Agregar sensor**: crea un sensor con el nombre indicado (POST, espera status 201) y muestra un snackbar con el `_id` del sensor creado.

> El servidor de la API debe estar en ejecución (codespace abierto) y el puerto 3000 en visibilidad Public para que la aplicación web pueda comunicarse con él.
