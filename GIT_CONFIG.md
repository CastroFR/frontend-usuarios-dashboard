# 📋 Configuración de Git - Archivos Tracked vs Ignorados

Este documento explica qué archivos están versionados en Git y cuáles están ignorados por seguridad.

---

## ✅ Archivos QUE SÍ se suben al Repositorio

Estos archivos están versionados y se descargarán cuando clones el proyecto:

### Configuración del Proyecto

```
package.json              ✅ Dependencias del proyecto
package-lock.json         ✅ Versiones exactas de dependencias
.env.example              ✅ Plantilla de variables de entorno
```

### Configuración de Herramientas

```
tailwind.config.js        ✅ Configuración de Tailwind CSS v3
vite.config.js            ✅ Configuración de Vite
postcss.config.js         ✅ Configuración de PostCSS
jsconfig.json             ✅ Configuración de JavaScript
.prettierrc                ✅ Formateo automático de código
eslint.config.js          ✅ Linting y validación de código
```

### Documentación

```
README.md                 ✅ Guía principal del proyecto
SETUP.md                  ✅ Instrucciones de instalación
```

### Archivos del Proyecto

```
src/                      ✅ Código fuente
tests/                    ✅ Archivos de prueba
public/                   ✅ Recursos públicos
```

---

## ❌ Archivos QUE NO se suben al Repositorio

Estos archivos están en `.gitignore` y NO se versioned por seguridad o por ser temporales:

### Variables de Entorno (SENSIBLES)

```
.env                      ❌ Archivo de configuración local (NUNCA subir)
.env.local                ❌ Configuración local adicional
.env.*.local              ❌ Configuraciones específicas por ambiente
```

**Por qué:** Contiene credenciales, URLs de base de datos, tokens, etc.

**Qué hacer:** 
- Copiar `.env.example` → `.env`
- Llenar con tus valores locales
- Nunca commitear `.env` con datos sensibles

### Node Modules

```
node_modules/             ❌ Dependencias instaladas
```

**Por qué:** Ocupa mucho espacio (cientos de MB) y se puede regenerar

**Qué hacer:** Los otros desarrolladores ejecutarán `npm install` para obtener las dependencias

### Compilación y Build

```
dist/                     ❌ Carpeta de compilación para producción
dist-ssr/                 ❌ Compilación server-side rendering
*.local                   ❌ Archivos locales temporales
```

### Logs y Debug

```
logs/                     ❌ Archivos de log
*.log                     ❌ Archivos de log de npm/yarn
npm-debug.log*            ❌ Logs de npm
yarn-debug.log*           ❌ Logs de yarn
pnpm-debug.log*           ❌ Logs de pnpm
lerna-debug.log*          ❌ Logs de lerna
```

### Editor y IDE

```
.vscode/                  ❌ Configuración local de VS Code
.idea/                    ❌ Configuración local de IntelliJ
*.suo                     ❌ Archivos de Visual Studio
*.swp, *.swo              ❌ Archivos temporales de editores
```

**Nota:** Se permite `.vscode/extensions.json` para compartir extensiones recomendadas

### Sistema Operativo

```
.DS_Store                 ❌ Archivos de macOS
Thumbs.db                 ❌ Archivos de Windows
.Trashes                  ❌ Archivos de macOS Trash
```

### Testing

```
coverage/                 ❌ Reportes de cobertura de tests
.nyc_output/              ❌ Datos de NYC (code coverage)
```

---

## 🔄 Flujo de Trabajo

### Para el Desarrollador Original (Subiendo cambios)

1. **NO guardes credenciales en `.env`** dentro del repositorio
2. **Usa `.env.example`** como plantilla para que otros sepan qué variables necesitan
3. Cuando hagas cambios en dependencias:
   ```bash
   npm install package-name
   # Automáticamente actualiza package.json y package-lock.json
   git add package.json package-lock.json
   git commit -m "feat: add new dependency"
   ```

4. Cuando cambies configuración de herramientas:
   ```bash
   git add tailwind.config.js vite.config.js postcss.config.js
   git commit -m "config: update tooling configuration"
   ```

### Para Nuevos Desarrolladores (Clonando el proyecto)

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/CastroFR/frontend-usuarios-dashboard.git
   cd frontend-usuarios-dashboard
   ```

2. **Instalar todas las dependencias exactas**
   ```bash
   npm install
   ```
   Esto lee `package-lock.json` e instala las versiones exactas

3. **Crear su archivo `.env` local**
   ```bash
   cp .env.example .env
   ```

4. **Configurar el `.env` con sus valores**
   ```bash
   # Editar .env y configurar:
   VITE_API_URL=http://localhost:8000/api
   # ... otros valores según su entorno
   ```

5. **Listo, ejecutar el proyecto**
   ```bash
   npm run dev
   ```

---

## 🛡️ Seguridad

### Reglas Importantes

❌ **NUNCA** hagas commit de:
- `.env` con credenciales reales
- Tokens de autenticación
- Contraseñas
- URLs sensibles
- API keys privadas

✅ **SIEMPRE** usa:
- `.env.example` como plantilla pública
- Variables de entorno para datos sensibles
- `.gitignore` para archivos que no deben subirse

### Si Accidentalmente Subiste Credenciales

```bash
# Eliminar del historio de git
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env' \
  --prune-empty --tag-name-filter cat -- --all

# O usar git-filter-repo (más moderno)
git filter-repo --path .env --invert-paths
```

---

## 📊 Estado Actual del Repositorio

### Archivos siendo Tracked ✅

```
✅ package.json
✅ package-lock.json
✅ .env.example
✅ tailwind.config.js
✅ vite.config.js
✅ postcss.config.js
✅ eslint.config.js
✅ jsconfig.json
✅ .prettierrc
✅ README.md
✅ SETUP.md
✅ src/ (todo el código)
✅ tests/ (todo los tests)
✅ public/ (recursos públicos)
```

### Archivos siendo Ignorados ❌

```
❌ node_modules/
❌ dist/
❌ .env
❌ .env.local
❌ .vscode/ (excepto extensions.json)
❌ .idea/
❌ coverage/
❌ *.log
❌ .DS_Store
❌ Thumbs.db
```

---

## ✨ Conclusión

Con esta configuración:

1. ✅ **Otros desarrolladores pueden clonar y ejecutar** `npm install && npm run dev` sin problemas
2. ✅ **Todas las dependencias exactas están aseguradas** por `package-lock.json`
3. ✅ **Las configuraciones de herramientas están versionadas** (Tailwind, Vite, ESLint, etc.)
4. ✅ **Los datos sensibles están protegidos** (`.env` está ignorado)
5. ✅ **El repositorio es limpio y eficiente** (sin node_modules, logs, etc.)

¡Todo listo para trabajar en equipo de forma segura! 🚀
