# Valencia Dev React (Landing en React)

Landing de captación (Valencia + toda España) hecha en **React + Vite**.

## Arrancar

```bash
cd /home/ubuntu/.openclaw/workspace/valencia-dev-react
npm install
npm run dev
```

Luego abre el enlace que te da Vite (normalmente http://localhost:5173).

## Build (producción)

```bash
npm run build
npm run preview
```

## Personalización rápida

En `src/App.jsx` arriba del todo tienes el objeto `BRAND`:
- `name`, `email`, `phoneDisplay`, `phoneWa`, `domain`, etc.

Cambia:
- `phoneWa`: formato sin `+` y sin espacios. Ej: `34600111222`

## Formulario

Ahora mismo envía por `mailto:` (sin backend). Si quieres que llegue a:
- Email real vía servidor (Node/Express, serverless)
- Telegram
- HubSpot / Zoho / etc.

dímelo y te lo monto.
