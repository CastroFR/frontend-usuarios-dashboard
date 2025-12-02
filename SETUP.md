# 📦 Guía de Instalación y Configuración

Esta guía te ayudará a configurar el proyecto en tu entorno local después de clonar el repositorio.

---

## ✅ Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- **Node.js** versión 18.0 o superior
- **npm** versión 9.0 o superior (incluido con Node.js)
- **Git** para clonar el repositorio

Verifica tu versión ejecutando:

```bash
node --version
npm --version
git --version
```

---

## 🚀 Pasos de Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/CastroFR/frontend-usuarios-dashboard.git
cd frontend-usuarios-dashboard
```

### 2. Instalar Dependencias

```bash
npm install
```

Este comando instala todas las dependencias definidas en `package.json` y `package-lock.json`, incluyendo:

- **Tailwind CSS v3** - Framework de estilos
- **React 18** - Librería de componentes
- **Vite** - Build tool
- **React Router 6** - Navegación
- **Axios** - Cliente HTTP
- **Chart.js** - Gráficos
- Y todas las demás dependencias del proyecto

### 3. Configurar Variables de Entorno

Duplica el archivo `.env.example` y renómbralo a `.env`:

```bash
# En Windows (PowerShell)
Copy-Item .env.example -Destination .env

# En macOS/Linux
cp .env.example .env
```

Luego abre el archivo `.env` y configura las siguientes variables según tu entorno:

```dotenv
# API Configuration
VITE_API_URL=http://localhost:8000/api          # URL de la API (cambiar según necesidad)
VITE_API_TIMEOUT=10000                          # Timeout en milisegundos

# App Configuration
VITE_APP_NAME=Dashboard de Usuarios
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Sistema de administración de usuarios

# Features
VITE_ENABLE_DARK_MODE=true                      # Habilitar modo oscuro
VITE_ENABLE_ANALYTICS=false                     # Habilitar analytics
VITE_ENABLE_PWA=false                           # Habilitar PWA

# Development
VITE_DEBUG=true                                 # Modo debug
VITE_SHOW_DEV_TOOLS=true                        # Mostrar herramientas de desarrollo
```

**Importante:** El archivo `.env` está en `.gitignore` por seguridad. Nunca subas las credenciales reales al repositorio.

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173` (puerto puede variar)

---

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Previsualiza la compilación de producción |
| `npm run lint` | Ejecuta el linter (ESLint) |
| `npm test` | Ejecuta las pruebas unitarias |

---

## 📋 Configuraciones Incluidas

El proyecto incluye las siguientes configuraciones que ya están optimizadas:

### Tailwind CSS 3
- Archivo: `tailwind.config.js`
- Estilos globales: `src/assets/styles/theme.css`

### Vite
- Archivo: `vite.config.js`
- Optimizado para React y Tailwind

### ESLint
- Archivo: `eslint.config.js`
- Mantiene la calidad del código

### Prettier
- Archivo: `.prettierrc`
- Formatea el código automáticamente

### PostCSS
- Archivo: `postcss.config.js`
- Procesa CSS para Tailwind

---

## 🔗 Conexión con la API

Para que la aplicación funcione correctamente, necesitas que la API de Laravel esté ejecutándose en paralelo.

### Configurar la API Backend

1. Dirígete a la carpeta del proyecto backend:
   ```bash
   cd ../api-gestion-usuarios-laravel
   ```

2. Sigue las instrucciones en su `README.md` o `SETUP.md`

3. Asegúrate que el servidor esté corriendo en: `http://localhost:8000`

4. Verifica que `VITE_API_URL` en el `.env` del frontend apunte correctamente a la API

---

## 🐛 Solución de Problemas

### Problema: "node_modules not found"
**Solución:** Ejecuta `npm install` nuevamente

### Problema: "VITE_API_URL is not defined"
**Solución:** Asegúrate de haber creado el archivo `.env` correctamente copiando desde `.env.example`

### Problema: "API Connection Error"
**Solución:** Verifica que:
- La API está corriendo en `http://localhost:8000`
- El CORS está correctamente configurado en el backend
- El `VITE_API_URL` apunta a la URL correcta

### Problema: "Port 5173 already in use"
**Solución:** Ejecuta con un puerto diferente:
```bash
npm run dev -- --port 3000
```

---

## 📚 Documentación Adicional

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Axios Documentation](https://axios-http.com)

---

## ✨ Notas Finales

- **No modifiques `package-lock.json`** a mano. npm se encarga de él automáticamente
- **Usa `npm install` (no `npm update`)** para mantener las versiones exactas
- Si necesitas agregar nuevas dependencias, usa: `npm install nombre-paquete`
- Para actualizar todas las dependencias, usa: `npm update`

¡Listo! Ya deberías tener todo configurado y funcionando. ¿Necesitas ayuda? Revisa los logs o crea un issue en el repositorio.
