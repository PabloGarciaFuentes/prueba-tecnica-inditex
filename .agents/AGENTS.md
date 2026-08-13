# Reglas de Desarrollo del Proyecto Podcaster

Al modificar o ampliar este repositorio, se deben respetar de forma estricta las siguientes reglas técnicas:

## 1. Evitar CORS en iTunes API mediante JSONP
*   **Regla**: No utilices proxies CORS públicos (como `allorigins.win`) como mecanismo primario para consultar la API de iTunes (`/lookup`). Los proxies gratuitos sufren de latencias muy altas, caídas y bloqueos frecuentes (errores 522) por parte de Apple.
*   **Implementación**: La API de iTunes soporta **JSONP** de forma nativa. Utiliza la función helper `fetchJsonp` (que inyecta dinámicamente elementos `<script>` y expone callbacks globales autolimpiables) como canal principal. Utiliza peticiones directas normales o proxies únicamente como fallbacks.

## 2. Personalización de Color en ThinkingOrb (Canvas)
*   **Regla**: El componente `<ThinkingOrb />` se renderiza sobre un Canvas 2D en escala de grises (monocromo) y no acepta la propiedad `color` ni hereda estilos CSS de texto estándar.
*   **Implementación**: Para cambiar su color a un tono de marca (como el azul-600 `#2563eb`), aplica un estilo con la propiedad CSS `filter`. Prepara la base forzando los píxeles a negro con `brightness(0) saturate(100%)` y después aplica la conversión de filtro calculada (por ejemplo, `invert(27%) sepia(85%) saturate(2462%) hue-rotate(213deg) brightness(97%) contrast(101%)` para obtener el color azul exacto).

## 3. Estado de Carga y Búfer del Reproductor de Audio
*   **Regla**: Los episodios con pistas de audio grandes tardan segundos en cargar. No muestres los controles de reproducción en "0:00" sin retroalimentación visual.
*   **Implementación**: Controla el estado de carga (`isAudioLoading`) escuchando de forma explícita los eventos nativos del elemento `<audio>`: `onLoadStart` y `onWaiting` para activar el loader, y `onCanPlay` y `onPlaying` para ocultarlo.
