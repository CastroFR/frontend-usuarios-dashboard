<p align="center"><a href="https://react.dev" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="100" alt="React Logo"></a></p>

<p align="center">
<a href="#-características-principales"><img src="https://img.shields.io/badge/Estado-Completado-brightgreen" alt="Status"></a>
<a href="#-tecnologías"><img src="https://img.shields.io/badge/React-v18-blue" alt="React Version"></a>
<a href="#-equipo-de-3-personas"><img src="https://img.shields.io/badge/Equipo-3%20Personas-blueviolet" alt="Team"></a>
</p>

# 🚀 Dashboard de Administración de Usuarios - Frontend

Dashboard profesional construido con **React + Vite + Tailwind CSS** para consumir la API de Gestión de Usuarios desarrollada en Laravel.

---

## 📋 Características Principales

- ✅ **Autenticación JWT** completa con refresh automático
- ✅ **Dashboard interactivo** con estadísticas en tiempo real
- ✅ **CRUD completo** de usuarios (Crear, Leer, Actualizar, Eliminar)
- ✅ **Gestión avanzada** con soft deletes y restauración
- ✅ **Estadísticas detalladas** (diarias, semanales, mensuales)
- ✅ **Diseño responsivo** adaptado a móviles, tablets y desktop
- ✅ **Modo oscuro/claro** con persistencia
- ✅ **Arquitectura modular** siguiendo principios SOLID
- ✅ **Testing completo** con Vitest y Testing Library

---

## 🛠️ Tecnologías

- **React 18** + Hooks
- **Vite** - Build tool ultra rápido
- **Tailwind CSS** - Framework CSS utility-first
- **React Router 6** - Navegación declarativa
- **React Query** - Manejo de estado del servidor
- **Axios** - Cliente HTTP
- **Chart.js** + React Chartjs 2 - Gráficos
- **React Hook Form** - Formularios
- **Heroicons** - Iconografía
- **Vitest** + Testing Library - Testing

---

## 👥 Equipo de 3 Personas

### **Persona 1: Configuración Base y Autenticación**

**Responsabilidades:**
- Configuración del proyecto
- Servicios API e Axios
- Autenticación JWT
- Rutas protegidas
- Contexto global de React

**Carpetas principales:**
```
src/api/
src/contexts/
src/hooks/
src/routes/
```

**Archivos clave a completar primero:**
- `src/api/axiosConfig.js` - Configuración de Axios
- `src/api/authService.js` - Servicios de autenticación
- `src/contexts/AuthContext.jsx` - Contexto de autenticación
- `src/routes/PrivateRoute.jsx` - Rutas protegidas

---

### **Persona 2: Componentes UI y Layout**

**Responsabilidades:**
- Sistema de diseño
- Componentes reutilizables
- Layout principal
- Modo oscuro/claro
- Estilos globales

**Carpetas principales:**
```
src/components/
src/assets/
```

**Archivos clave a completar primero:**
- `src/components/common/Button/Button.jsx` - Componente Button
- `src/components/common/Input/Input.jsx` - Componente Input
- `src/components/layout/Layout.jsx` - Layout principal
- `src/assets/styles/global.css` - Estilos globales

---

### **Persona 3: Páginas y Vistas**

**Responsabilidades:**
- Páginas principales
- Formularios y validaciones
- Navegación
- Integración de componentes

**Carpetas principales:**
```
src/views/
```

**Archivos clave a completar primero:**
- `src/views/Auth/Login.jsx` - Página de login
- `src/views/Auth/Register.jsx` - Página de registro
- `src/views/Dashboard/Dashboard.jsx` - Dashboard principal
- `src/views/Users/UserList.jsx` - Listado de usuarios

---

## 🚀 Instalación y Configuración Rápida

Para una instalación completa y detallada, **lee el archivo `SETUP.md`** incluido en el proyecto. Aquí va un resumen rápido:

### Pasos Rápidos:

```bash
# 1. Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd frontend-usuarios-dashboard

# 2. Instalar todas las dependencias (incluyendo Tailwind CSS v3)
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### ℹ️ Importante

- **Lee `SETUP.md`** para instrucciones detalladas de instalación, configuración y solución de problemas
- Todos los archivos de configuración (`.env.example`, `package.json`, `package-lock.json`, `tailwind.config.js`, `vite.config.js`, etc.) están incluidos para que funcione con una sola instalación
- El archivo `.env` NO se sube al repositorio por seguridad, pero `.env.example` sí está disponible como plantilla

### 📋 Archivos de Configuración Incluidos

Estos archivos están versionados en Git y se descargarán automáticamente:

✅ `package.json` - Dependencias del proyecto (Tailwind CSS 3, React 18, etc.)
✅ `package-lock.json` - Versiones exactas de las dependencias
✅ `.env.example` - Plantilla de variables de entorno
✅ `tailwind.config.js` - Configuración de Tailwind CSS v3
✅ `vite.config.js` - Configuración de Vite
✅ `postcss.config.js` - Configuración de PostCSS
✅ `.prettierrc` - Formateo de código
✅ `eslint.config.js` - Linting de código
✅ `jsconfig.json` - Configuración de JavaScript

### 🔧 Construir para Producción

```bash
npm run build
```

---

## 📁 Estructura del Proyecto

```
frontend-usuarios-dashboard/
├── src/
│   ├── api/                    # Servicios API (Persona 1)
│   │   ├── axiosConfig.js
│   │   ├── authService.js
│   │   ├── userService.js
│   │   └── statisticsService.js
│   ├── assets/                 # Recursos estáticos (Persona 2)
│   │   └── styles/
│   │       ├── global.css
│   │       └── theme.css
│   ├── components/             # Componentes reutilizables (Persona 2)
│   │   ├── common/
│   │   │   ├── Button
│   │   │   ├── Input
│   │   │   ├── Card
│   │   │   └── Modal
│   │   └── layout/
│   │       ├── Header
│   │       ├── Sidebar
│   │       └── Layout.jsx
│   ├── contexts/               # Contextos React (Persona 1)
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/                  # Custom hooks (Persona 1)
│   │   ├── useAuth.js
│   │   ├── useUsers.js
│   │   └── useForm.js
│   ├── routes/                 # Configuración de rutas (Persona 1)
│   │   ├── PrivateRoute.jsx
│   │   ├── PublicRoute.jsx
│   │   └── AppRoutes.jsx
│   ├── utils/                  # Utilidades (Todos)
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── helpers.js
│   ├── views/                  # Páginas/Vistas (Persona 3)
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── Users/
│   │   │   ├── UserList.jsx
│   │   │   └── UserForm.jsx
│   │   └── Statistics/
│   │       └── Statistics.jsx
│   ├── App.jsx
│   └── main.jsx
├── tests/
│   ├── unit/
│   └── integration/
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── package.json
└── README.md
```

---

## 📦 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con hot reload |
| `npm run build` | Construye optimizado para producción |
| `npm run preview` | Previsualiza la compilación de producción localmente |
| `npm run lint` | Valida código con ESLint |
| `npm run test` | Ejecuta todos los tests unitarios e integración |
| `npm run test:watch` | Ejecuta tests en modo watch (re-ejecuta en cambios) |
| `npm run test:ui` | Interfaz visual para ejecutar y monitorear tests |
| `npm run test:coverage` | Genera reporte de cobertura de tests |

**Para más información sobre instalación y configuración**, consulta el archivo `SETUP.md`

---

## 🧪 Testing

### Suite de Tests Completa

El proyecto incluye **46 casos de prueba** cubriendo:

- ✅ **Servicios API**: Autenticación, Usuarios, Estadísticas (13 tests)
- ✅ **Utilidades**: Formatters, Validadores, Constantes (10 tests)
- ✅ **Flujos de Trabajo**: Login, Gestión de Usuarios, Estadísticas (17 tests)
- ✅ **Componentes**: Button y otros componentes reutilizables (6 tests)

### Estructura de Tests

```
tests/
├── setup.js                    # Configuración global y mocks
├── unit/
│   ├── services.test.js       # Tests de servicios API (13 tests)
│   └── utils.test.js          # Tests de utilidades (10 tests)
└── integration/
    └── workflows.test.js      # Tests de flujos completos (17 tests)

src/components/
└── common/Button/
    └── Button.test.js         # Tests de componentes (6 tests)
```

### Ejecutar tests

```bash
# Ejecutar todos los tests una sola vez
npm run test

# Modo watch - monitorea cambios
npm run test:watch

# Interfaz visual interactiva
npm run test:ui

# Cobertura de tests
npm run test:coverage
```

### Resultados Esperados

```
✓ src/components/common/Button/Button.test.js (6 tests)
✓ tests/unit/utils.test.js (10 tests)
✓ tests/unit/services.test.js (13 tests)
✓ tests/integration/workflows.test.js (17 tests)

Test Files  4 passed (4)
Tests       46 passed (46)
Duration    2.13s
```

**Para documentación detallada de tests**, consulta [`TESTING.md`](TESTING.md)

---

## 🔗 Integración con API

La aplicación se conecta con la API Laravel en:

```
Base URL: http://localhost:8000/api
```

### Endpoints principales:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/login` | Autenticación |
| POST | `/register` | Registrar usuario |
| GET | `/users` | Listar usuarios |
| POST | `/users` | Crear usuario |
| PUT | `/users/{id}` | Actualizar usuario |
| DELETE | `/users/{id}` | Eliminar usuario |
| POST | `/users/{id}/restore` | Restaurar usuario |
| DELETE | `/users/{id}/force` | Eliminar permanentemente |
| GET | `/statistics/daily` | Estadísticas diarias |
| GET | `/statistics/weekly` | Estadísticas semanales |
| GET | `/statistics/monthly` | Estadísticas mensuales |
| GET | `/statistics/summary` | Resumen general |

---

## 🔐 Autenticación

### Flujo de autenticación:

1. Usuario inicia sesión con email y contraseña
2. API devuelve token JWT
3. Token se almacena en localStorage
4. Se incluye en header `Authorization: Bearer {token}`
5. Si expira, se usa refresh token automáticamente
6. Si falla, redirige a login

---

## 🎨 Personalización

### Temas y Colores

Los temas se configuran en `tailwind.config.js`. Puedes personalizar:
- Paleta de colores
- Tipografía
- Espaciados
- Breakpoints
- Modo oscuro/claro

### Componentes

Los componentes reutilizables están en `src/components/`. Sigue la estructura modular para mantener la organización y facilitar el mantenimiento.

---

## 📋 Checklist de Implementación

### Fase 1: Configuración Base (Persona 1)
- [ ] Configurar Axios y servicios API
- [ ] Implementar AuthContext
- [ ] Crear hooks de autenticación
- [ ] Configurar rutas públicas/privadas
- [ ] Implementar refresh token automático

### Fase 2: Componentes (Persona 2)
- [ ] Crear componentes comunes (Button, Input, Card)
- [ ] Implementar Layout principal
- [ ] Crear Header y Sidebar
- [ ] Configurar estilos globales
- [ ] Implementar modo oscuro/claro

### Fase 3: Páginas (Persona 3)
- [ ] Página de Login
- [ ] Página de Registro
- [ ] Dashboard con estadísticas
- [ ] Listado de usuarios
- [ ] Formularios de CRUD

### Fase 4: Testing e Integración (Todos)
- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Pruebas end-to-end
- [ ] Documentación final

---

## 🐛 Solución de Problemas

### Puerto 5173 ya en uso

```bash
npm run dev -- --port 3000
```

### Módulos no encontrados

```bash
rm -rf node_modules package-lock.json
npm install
```

### Cache de Vite

```bash
npm run dev -- --force
```

### CORS errors

Verifica que:
- API Laravel tiene CORS habilitado
- Base URL en `.env` es correcta
- Token se envía correctamente

---

## 🔄 Flujo de Trabajo Colaborativo

### Commits

```bash
# Features
git commit -m "feat: descripción de la característica"

# Fixes
git commit -m "fix: descripción del arreglo"

# Documentation
git commit -m "docs: descripción del cambio"
```

### Ramas

```bash
git checkout -b feature/nombre-feature
git push origin feature/nombre-feature
# Crear Pull Request en GitHub
```

### Sincronización

```bash
# Mantener rama actualizada
git pull origin main

# Rebase interactivo
git rebase -i origin/main
```

---

## 📞 Soporte

Para problemas o preguntas:

1. Revisar logs en la consola del navegador (F12)
2. Verificar terminal del servidor de desarrollo
3. Consultar API en Postman
4. Abrir issue en el repositorio

---

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---

Desarrollado como proyecto final - FSJ 30
