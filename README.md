# Prueba Técnica Frontend - Inditex (Podcaster)

Aplicación web Single Page Application (SPA) para buscar, detallar y escuchar podcasts musicales. Proyecto desarrollado con **React**, **TypeScript**, **Vite** y **Tailwind CSS v4** enfocado a un perfil de desarrollo **Senior**.

---

## 🚀 Arquitectura y Decisiones de Diseño

### 1. Sistema de Carga Nivel Senior (Resiliencia ante CORS)
*   **JSONP como Mecanismo Principal**: Aunque las especificaciones del PDF sugerían el uso del proxy de CORS de *AllOrigins*, los servidores de proxies gratuitos sufren caídas frecuentes o bloqueos por parte del CDN de Apple (errores Cloudflare 522). Al descubrir que la API de iTunes soporta **JSONP** de forma nativa (`&callback=`), he implementado un wrapper en [apiClient.ts](src/services/apiClient.ts) que inyecta elementos `<script>` de forma dinámica y limpia.
*   **Inmunidad a CORS**: JSONP es completamente inmune al bloqueo de CORS por diseño del navegador.
*   **Fallback en Cascada**: Si JSONP fallase, el cliente API pasa de forma automática a intentar la petición directa y, como último recurso, a través del proxy de *AllOrigins*, garantizando que la aplicación nunca se quede colgada.

### 2. Motor de Caché Personalizado (24 Horas)
*   Se implementó [cacheService.ts](src/services/cacheService.ts) para almacenar la lista de los 100 podcasts principales y los detalles de cada podcast individual en `localStorage`.
*   Cada entrada almacena los datos y un timestamp. Al recuperar datos, el servicio valida si han transcurrido más de 24 horas; si es así, elimina la entrada de la caché de forma proactiva y devuelve `null` para forzar un refresco desde la API.

### 3. Indicador de Carga Global
*   La cabecera contiene un indicador de carga visual (un punto parpadeante azul en la esquina superior derecha).
*   Se sincroniza con el estado de navegación global de **React Router v6** (`useNavigation().state === 'loading'`).
*   Los datos se obtienen mediante **Loaders** de rutas. Cuando el usuario navega, el indicador se activa automáticamente durante el tiempo de respuesta de la API (solo cuando no hay caché) y desaparece de forma fluida una vez la nueva vista es renderizada.

### 4. Cobertura de Tests (Vitest)
*   Aunque la prueba no lo exigía, se configuró **Vitest** y **jsdom** para implementar pruebas unitarias básicas sobre los formateadores y el servicio de caché (utilizando temporizadores simulados con `vi.useFakeTimers()`).

---

## 🛠️ Requisitos de Ejecución

Asegúrate de tener instalado **Node.js** (versión v18 o superior recomendada).

### Instalación de dependencias:
```bash
npm install
```

### 1. Ejecución en Modo Desarrollo (Assets sin minimizar)
Ejecuta el servidor de desarrollo local con soporte HMR:
```bash
npm run dev
```
Accede a la URL indicada en consola (normalmente `http://localhost:5173/`).

### 2. Ejecución en Modo Producción (Assets concatenados y minimizados)
Compila el proyecto optimizando y minimizando el código en la carpeta `dist/` y levanta el servidor de previsualización:
```bash
npm run build
npm run preview
```
Accede a la URL de producción indicada (normalmente `http://localhost:4173/`).

### 3. Ejecución de Tests
Corre los tests unitarios creados para el proyecto:
```bash
npm run test
```

---

## 📂 Estructura del Proyecto

*   `src/components/`: Componentes comunes e independientes (ej. `PodcastSidebar`).
*   `src/layouts/`: Plantillas base (`RootLayout`).
*   `src/pages/`: Vistas de la aplicación (`MainPage`, `PodcastPage`, `EpisodePage`).
*   `src/services/`: Motor de caché y cliente API.
*   `src/types/`: Tipados y contratos de datos.
*   `src/utils/`: Formateadores de fecha y duración.
