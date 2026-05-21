# Totalplay DS Assistant

Web app para consultar el Design System de Totalplay en lenguaje natural.

## Qué hace

- **Chat con el DS** — pregunta qué componentes, íconos o tokens existen
- **Búsqueda visual** — sube una imagen y encuentra el elemento más parecido en la librería
- **En radar** — agrega elementos que el equipo necesita y no están en la librería
- **Vista de librería** — explora todos los componentes y elementos disponibles

## Setup

### 1. Agrega tu API key de Claude

Abre `index.html` y busca esta línea:

```js
headers: { 'Content-Type': 'application/json', 'x-api-key': '', ...
```

Reemplaza el string vacío con tu API key de Anthropic:

```js
'x-api-key': 'sk-ant-...'
```

### 2. Abre el archivo

Abre `index.html` directamente en tu navegador. No necesita servidor.

> **Nota CORS**: Si la Figma API da error de CORS en el browser, necesitas correrlo con un servidor local simple:
> ```bash
> npx serve .
> ```
> O usa la extensión "Live Server" en VS Code.

## Archivos

```
ds-assistant/
└── index.html   ← toda la app en un solo archivo
```

## Datos conectados

- **UI-Kit App** — componentes, variables (color, font, space, radius), estilos
- **Icons & Media** — íconos, logos, covers, imágenes

Los datos se cargan en tiempo real desde Figma cada vez que se abre la app.
