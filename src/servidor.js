const http = require("node:http");
const process = require("node:process");
const { URL } = require("node:url");
const {
  sumar,
  restar,
  multiplicar,
  dividir
} = require("./operaciones");

const operaciones = {
  sumar,
  restar,
  multiplicar,
  dividir
};

function responderJson(respuesta, estado, contenido) {
  respuesta.writeHead(estado, {
    "Content-Type": "application/json; charset=utf-8"
  });
  respuesta.end(JSON.stringify(contenido));
}

function obtenerNumero(parametros, nombre) {
  const valor = parametros.get(nombre);
  const numero = Number(valor);

  if (valor === null || valor.trim() === "" || !Number.isFinite(numero)) {
    throw new Error(`El parámetro ${nombre} debe ser un número válido`);
  }

  return numero;
}

function paginaPrincipal() {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Operaciones matemáticas</title>
  <style>
    :root { color-scheme: light; font-family: Arial, sans-serif; }
    body { margin: 0; background: #f3f6fa; color: #172033; }
    main { max-width: 850px; margin: 48px auto; padding: 0 20px; }
    header, section { background: white; border-radius: 14px; padding: 28px; margin-bottom: 18px; box-shadow: 0 8px 26px rgba(23, 54, 93, .08); }
    h1, h2 { color: #17365d; }
    h1 { margin-top: 0; }
    code { background: #eaf1f8; padding: 3px 6px; border-radius: 5px; }
    li { margin: 10px 0; }
    .estado { color: #147a3e; font-weight: 700; }
  </style>
</head>
<body>
  <main>
    <header>
      <p class="estado">● Ambiente disponible</p>
      <h1>Operaciones matemáticas</h1>
      <p>Aplicación académica desplegable en Render para demostrar un ambiente efímero de pruebas.</p>
    </header>
    <section>
      <h2>API disponible</h2>
      <p>Utiliza dos parámetros numéricos: <code>a</code> y <code>b</code>.</p>
      <ul>
        <li><a href="/api/sumar?a=4&b=2"><code>/api/sumar?a=4&amp;b=2</code></a></li>
        <li><a href="/api/restar?a=4&b=2"><code>/api/restar?a=4&amp;b=2</code></a></li>
        <li><a href="/api/multiplicar?a=4&b=2"><code>/api/multiplicar?a=4&amp;b=2</code></a></li>
        <li><a href="/api/dividir?a=4&b=2"><code>/api/dividir?a=4&amp;b=2</code></a></li>
      </ul>
    </section>
    <section>
      <h2>Verificación</h2>
      <p>Render puede comprobar la disponibilidad del servicio mediante <a href="/health"><code>/health</code></a>.</p>
    </section>
  </main>
</body>
</html>`;
}

function manejarSolicitud(solicitud, respuesta) {
  const url = new URL(solicitud.url, "http://localhost");

  if (solicitud.method === "GET" && url.pathname === "/") {
    respuesta.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });
    respuesta.end(paginaPrincipal());
    return;
  }

  if (solicitud.method === "GET" && url.pathname === "/health") {
    responderJson(respuesta, 200, {
      status: "ok",
      servicio: "operaciones-matematicas"
    });
    return;
  }

  const coincidencia = url.pathname.match(/^\/api\/(sumar|restar|multiplicar|dividir)$/);

  if (solicitud.method === "GET" && coincidencia) {
    const operacion = coincidencia[1];

    try {
      const a = obtenerNumero(url.searchParams, "a");
      const b = obtenerNumero(url.searchParams, "b");
      const resultado = operaciones[operacion](a, b);

      responderJson(respuesta, 200, {
        operacion,
        operandos: { a, b },
        resultado
      });
    } catch (error) {
      responderJson(respuesta, 400, {
        error: error.message
      });
    }
    return;
  }

  responderJson(respuesta, 404, {
    error: "Ruta no encontrada"
  });
}

function crearServidor() {
  return http.createServer(manejarSolicitud);
}

if (require.main === module) {
  const puerto = Number(process.env.PORT) || 3000;
  const servidor = crearServidor();

  servidor.listen(puerto, "0.0.0.0", () => {
    process.stdout.write(`Servidor disponible en el puerto ${puerto}\n`);
  });

  process.on("SIGTERM", () => {
    servidor.close(() => process.exit(0));
  });
}

module.exports = {
  crearServidor,
  manejarSolicitud
};
