# 🚀 INICIO RÁPIDO - Para Nuevos Desarrolladores

## ⚡ En 5 Minutos

```bash
# 1️⃣  Clonar
git clone https://github.com/CastroFR/frontend-usuarios-dashboard.git
cd frontend-usuarios-dashboard

# 2️⃣ Instalar (con Tailwind CSS v3, React 18, y todas las dependencias)
npm install

# 3️⃣ Configurar .env
copy .env.example .env

# 4️⃣ Ejecutar
npm run dev
```

✅ Listo! La app está en `http://localhost:5173`

---

## 📚 Documentación Completa

| Archivo | Contenido |
|---------|-----------|
| **README.md** | 📖 Guía completa del proyecto |
| **SETUP.md** | 🔧 Instrucciones detalladas de instalación |
| **GIT_CONFIG.md** | 🛡️ Qué archivos están versionados y cuáles no |
| **.env.example** | 🔐 Plantilla de variables de entorno |

---

## ✅ Qué Se Sube al Repositorio

```
✅ package.json + package-lock.json    → Todas las dependencias exactas
✅ .env.example                        → Plantilla de configuración
✅ tailwind.config.js                  → Config de Tailwind CSS v3
✅ vite.config.js                      → Config de Vite
✅ postcss.config.js                   → Config de PostCSS
✅ eslint.config.js + .prettierrc       → Config de código
✅ README.md + SETUP.md + GIT_CONFIG.md → Documentación
```

---

## ❌ Qué NO Se Sube

```
❌ node_modules/    → Se instala con npm install
❌ dist/            → Se genera con npm run build
❌ .env             → Datos sensibles (copiar de .env.example)
❌ .vscode/         → Configuración local del editor
❌ Logs y coverage/ → Archivos temporales
```

---

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia servidor con hot reload

# Compilación
npm run build            # Compila para producción
npm run preview          # Previsualiza la build

# Testing
npm run test             # Ejecuta tests
npm run test:coverage    # Reporte de cobertura

# Linting
npm run lint             # Valida código con ESLint
```

---

## 🛡️ Regla de Oro

✋ **NUNCA** hagas commit de credenciales en `.env`

Usa `.env.example` como plantilla y cada desarrollador crea su `.env` local (que está en `.gitignore`).

---

## 📞 ¿Problemas?

1. Revisa **SETUP.md** → Sección "Solución de Problemas"
2. Verifica que la API esté corriendo en `http://localhost:8000`
3. Asegúrate de tener **Node.js 18+** → `node --version`

---

**¡Todo listo!** 🎉 Lee **README.md** para más detalles sobre la arquitectura del proyecto.
