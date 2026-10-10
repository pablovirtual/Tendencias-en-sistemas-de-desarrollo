# Actividades 2.1, 2.2 y 2.3

Proyecto académico para demostrar pruebas y cobertura con Jest, análisis estático con ESLint y despliegue en un ambiente efímero con Render.

## Requisitos

- Node.js 18 o una versión posterior.
- npm.

## Instalación

```bash
npm install
```

## Ejecutar las pruebas

```bash
npm test
```

## Generar la cobertura de código

```bash
npm run test:coverage
```

Jest mostrará en la terminal los porcentajes de sentencias, ramas, funciones y líneas cubiertas. También generará el reporte visual:

```text
coverage/lcov-report/index.html
```

## Evidencias recomendadas

1. Estructura del proyecto en Visual Studio Code.
2. Archivo `src/operaciones.js`.
3. Archivo `tests/operaciones.test.js`.
4. Configuración de los scripts y Jest en `package.json`.
5. Terminal después de ejecutar `npm run test:coverage`.
6. Reporte HTML ubicado en `coverage/lcov-report/index.html`.

## Interpretación de las métricas

- **Statements:** porcentaje de sentencias ejecutadas por las pruebas.
- **Branches:** porcentaje de decisiones evaluadas, como las dos posibilidades de una condición `if`.
- **Functions:** porcentaje de funciones ejecutadas.
- **Lines:** porcentaje de líneas de código ejecutadas.

El caso de división entre cero permite comprobar ambas ramas de la condición incluida en la función `dividir`.

## Actividad 2.2: Lint / Linting con ESLint

La configuración se encuentra en `eslint.config.js`. Las reglas comprueban variables no utilizadas o no definidas, uso de igualdad estricta, llaves, punto y coma, comillas dobles, indentación y comas finales.

### Analizar el proyecto

```bash
npm run lint
```

Si no aparece ningún mensaje y el proceso termina correctamente, ESLint no encontró problemas.

### Mostrar errores deliberados para la evidencia

El archivo `ejemplos/operaciones-con-errores.js` contiene problemas intencionales y está excluido del análisis normal para no afectar el proyecto. Para analizar únicamente ese ejemplo ejecuta:

```bash
npm run lint:demo
```

El comando debe terminar con errores. Esto es deliberado y permite tomar una captura clara de la detección realizada por ESLint.

### Corregir automáticamente los problemas compatibles

```bash
npm run lint:fix
```

### Ejecutar linting y pruebas

```bash
npm run verify
```

## Demostración solicitada en la actividad 2.2

Para obtener las evidencias del proceso sin dejar el proyecto dañado:

1. Abre `ejemplos/operaciones-con-errores.js` y toma una captura del código con problemas.
2. Ejecuta `npm run lint:demo` y captura los errores detectados.
3. Compara el ejemplo con el código correcto de `src/operaciones.js`.
4. Ejecuta `npm run verify` y captura la terminal mostrando que ESLint y Jest finalizaron correctamente.
5. Incluye las capturas en un documento Word y agrega una conclusión con aspectos positivos y negativos de ESLint.

## Evidencias recomendadas para la actividad 2.2

1. Archivo `eslint.config.js` abierto en Visual Studio Code.
2. Scripts `lint`, `lint:fix` y `verify` en `package.json`.
3. Código con uno o varios errores deliberados.
4. Terminal con los errores detectados por `npm run lint`.
5. Código corregido.
6. Terminal con `npm run verify` finalizado correctamente.

## Actividad 2.3: Ambiente efímero con Render

El proyecto incluye un servidor web construido con el módulo HTTP de Node.js, por lo que no requiere dependencias adicionales. Render inicia la aplicación con `npm start` y proporciona el puerto mediante la variable `PORT`.

### Ejecutar localmente

```bash
npm start
```

Abre `http://localhost:3000` en el navegador. Las rutas disponibles son:

- `/` muestra la página principal.
- `/health` informa si el servicio está disponible.
- `/api/sumar?a=4&b=2` suma dos números.
- `/api/restar?a=4&b=2` resta dos números.
- `/api/multiplicar?a=4&b=2` multiplica dos números.
- `/api/dividir?a=4&b=2` divide dos números.

### Desplegar en Render

El archivo `render.yaml` contiene la configuración del servicio gratuito:

- Runtime: Node.
- Build Command: `npm ci`.
- Start Command: `npm start`.
- Health Check Path: `/health`.
- Plan: Free.

Pasos en Render:

1. Publica este proyecto en un repositorio de GitHub.
2. En Render selecciona **New** y después **Blueprint**.
3. Conecta el repositorio que contiene `render.yaml`.
4. Revisa que el servicio use el plan **Free**.
5. Crea el Blueprint y espera a que el despliegue termine correctamente.
6. Abre la dirección `onrender.com` asignada a la aplicación.

También se puede crear como **Web Service** y utilizar manualmente `npm ci`, `npm start` y `/health`.

### Evidencias recomendadas para la actividad 2.3

1. Aplicación funcionando en `http://localhost:3000`.
2. Repositorio de GitHub con `src/servidor.js` y `render.yaml`.
3. Configuración del Blueprint o Web Service en Render.
4. Registro del despliegue con estado correcto.
5. Aplicación abierta mediante su dirección pública de Render.
6. Respuesta JSON de la ruta `/health` o de una operación.
