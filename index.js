const http = require("http");
const fs = require("fs");
const url = require("url");
const PORT = 8080;
http
  .createServer((req, res, err) => {
    const params = url.parse(req.url, true).query;
    const nombre = params.nombre;
    const contenido = params.contenido;
    const nuevoNombre = params.nuevoNombre;

    if (req.url.includes("/crear")) {
      fs.writeFile(nombre, contenido, () => {
        res.write(`Archivo ${nombre} creado con exito`);
        res.end();
      });
    }
    if (req.url.includes("/leer")) {
      fs.readFile(nombre, (err, data) => {
        res.write(data);
        res.end();
      });
    }
    if (req.url.includes("/renombrar")) {
      fs.rename(nombre, nuevoNombre, () => {
        res.write(`El archivo ${nombre} ha sido renombrado a ${nuevoNombre}`);
        res.end();
      });
    }
    if (req.url.includes("/eliminar")) {
      fs.unlink(nombre, () => {
        res.write(` El archivo ${nombre} fue eliminado correctamente`);
        res.end();
      });
    }
  })
  .listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));
