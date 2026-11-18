# SEGlobal 360 — Landing page

Sitio web de **www.seglobal360.com**. Está hecho con Next.js 16 (App Router), Tailwind CSS 4 y TypeScript. Casi todo se genera como contenido estático. La única parte dinámica es el rastreo de envíos (`/rastreo`), que lee el estado de cada guía desde una hoja de Google Sheets.

> Este proyecto usa **solo pnpm**. No uses `npm` ni `npx`. Si necesitas ejecutar un paquete, usa `pnpm dlx`.

## Requisitos

- Node.js 20.9 o superior (recomendado 22 o 24)
- pnpm 11 (`pnpm -v`)

## Correr en local

```bash
pnpm install      # instala dependencias
pnpm dev          # servidor de desarrollo en http://localhost:3000 (Ctrl+C para detenerlo)
```

Para que funcione el rastreo, crea un archivo `.env.local` en la raíz (no se sube a git):

```bash
TRACKING_SHEET_ID=1HSTkvPLzBoDItAdaTC5bEH_MdaB7RH61bLY2yFpfUwA   # ID de la hoja, el que aparece en su URL
TRACKING_SHEET_GID=0                                               # opcional: pestaña de la hoja (gid en la URL)
```

Para probar la versión de producción:

```bash
pnpm build        # compila; / debe salir estática (○) y /rastreo como prerender parcial (◐)
pnpm start        # sirve el build en http://localhost:3000 (Ctrl+C para detenerlo)
pnpm lint         # revisión con ESLint
```

## Qué editar

| Qué | Dónde |
| --- | --- |
| WhatsApp, mensaje prellenado, Instagram y LinkedIn | `lib/site.ts` |
| Servicios, soluciones logísticas, países y categorías | `lib/content.ts` |
| Menú de navegación | `navLinks` en `lib/site.ts` |
| Pasos del rastreo (nombres e íconos) | `lib/tracking-steps.ts` |
| Imagen principal (hero) | `public/images/hero.jpg` |
| Imagen al compartir el enlace (redes y WhatsApp) | `app/opengraph-image.jpg` |
| Favicon | `app/icon.svg` |
| Colores y tipografías | `app/globals.css` (`@theme`) y `app/layout.tsx` |

## Rastreo de envíos

La página `/rastreo` (también hay un formulario en el inicio) consulta una hoja de Google Sheets que hace de base de datos:

- La primera fila debe tener las columnas **`Tracking Number`**, **`Status`** y **`Descripción`**. El orden de las columnas da igual. La descripción es opcional: si tiene texto, se muestra en un recuadro debajo del estado.
- Los estados válidos, en orden, son:
  1. Recibido en bodega de origen
  2. En alistamiento
  3. Proceso de exportación
  4. En tránsito internacional
  5. Arribado al país de destino
  6. En gestión aduanera
  7. Liberado por aduanas
  8. Listo para entrega
  9. Entregado

  No importan mayúsculas, tildes ni espacios de más. Un estado distinto (por ejemplo, mal escrito) se muestra como texto, sin la línea de pasos. Para agregar o renombrar un estado hay que cambiarlo también en `lib/tracking-steps.ts`.
- Recomendado: en Google Sheets, ve a **Datos → Validación de datos** y crea en la columna `Status` un menú desplegable con esos 9 estados, para que no se escriban a mano.
- Las filas sin `Tracking Number` se ignoran.
- La hoja debe estar compartida como **"Cualquier persona con el enlace puede ver"**. Los visitantes del sitio no ven el enlace (solo lo usa el servidor), pero quien lo tenga sí puede ver la hoja completa.
- Los cambios en la hoja se reflejan en el sitio en 1 a 2 minutos, porque la lectura se guarda en cache.

**Antes de publicar** reemplaza los marcadores de `lib/site.ts`:

- `whatsapp`: el número con indicativo de país, solo dígitos (ej. `573001234567`).
- `instagram` y `linkedin`: las URLs reales de los perfiles.

## Estructura

```
app/          layout (metadata, SEO, fuentes), página, favicon, OG, robots y sitemap
components/   secciones de la página (Hero, Services, Coverage, …) y el logo en SVG
lib/          datos de contacto (site.ts), contenido (content.ts) y rastreo (tracking.ts, tracking-steps.ts)
public/       imagen del hero
```

## Despliegue en Vercel con GitHub

1. Crea un repositorio en GitHub y sube el proyecto:
   ```bash
   git init
   git add .
   git commit -m "Landing SEGlobal 360"
   git branch -M main
   git remote add origin git@github.com:<usuario>/<repo>.git
   git push -u origin main
   ```
2. En Vercel ve a **Add New → Project**, importa el repositorio y deja el framework en Next.js. Vercel detecta pnpm por el `pnpm-lock.yaml`.
3. (Recomendado) En **Settings → Environment Variables** agrega `ENABLE_EXPERIMENTAL_COREPACK=1`. Así Vercel usa la misma versión de pnpm declarada en `packageManager` (11.3.0).
4. En **Settings → Environment Variables** agrega `TRACKING_SHEET_ID` (y `TRACKING_SHEET_GID` si la pestaña no es la primera). Sin esta variable, la página de rastreo muestra un aviso de servicio no disponible.
5. Pulsa **Deploy**. Cada `git push` a `main` vuelve a publicar el sitio automáticamente.

### Dominio www.seglobal360.com

1. En el proyecto ve a **Settings → Domains** y agrega `www.seglobal360.com`.
2. Agrega también `seglobal360.com` y elige redirigirlo a `www.seglobal360.com` (redirección 308).
3. En el panel DNS de tu registrador crea los registros que Vercel te indique en esa pantalla. Normalmente son:
   - `A` para `@` apuntando a la IP que muestra Vercel.
   - `CNAME` para `www` apuntando al destino que muestra Vercel.

   Otra opción es cambiar los nameservers del dominio a los de Vercel.
4. El certificado SSL se genera solo cuando el DNS propaga (puede tardar desde minutos hasta unas horas).

> **Plan de Vercel:** la prueba Pro dura 14 días. El plan Hobby (gratis) es solo para uso personal no comercial según los términos de Vercel. Para el sitio de una empresa, al terminar la prueba hay que pasar a Pro.

## Créditos

- Foto del hero: [Robert So en Pexels](https://www.pexels.com/photo/cargo-ship-on-the-sea-at-sunset-14392678/). Licencia Pexels, uso comercial gratuito.
- Íconos: [Lucide](https://lucide.dev) (ISC) y banderas de [country-flag-icons](https://gitlab.com/catamphetamine/country-flag-icons) (MIT).
