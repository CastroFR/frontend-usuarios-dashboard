# 🚀 Dashboard de Administración de Usuarios

Dashboard profesional para gestión de usuarios construido con React, Vite y Tailwind CSS.

---

## ✨ Características

- ✅ **Autenticación JWT** completa con refresh token
- ✅ **Dashboard interactivo** con estadísticas en tiempo real
- ✅ **CRUD completo** de usuarios (Crear, Leer, Actualizar, Eliminar)
- ✅ **Gestión avanzada** con soft deletes y restauración
- ✅ **Estadísticas detalladas** (diarias, semanales, mensuales)
- ✅ **Diseño responsivo** adaptado a móviles, tablets y desktop
- ✅ **Modo oscuro/claro** con persistencia
- ✅ **Validaciones de formularios** robustas
- ✅ **Manejo de errores** elegante
- ✅ **Carga optimizada** con React Query
- ✅ **Testing** con Vitest y Testing Library
- ✅ **100% Type Safe** (con PropTypes)
- ✅ **Arquitectura modular** siguiendo principios SOLID

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

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Servicios de API
├── assets/                 # Recursos estáticos
├── components/
│   ├── common/            # Componentes genéricos
│   ├── layout/            # Componentes de layout
│   └── ui/                # Componentes específicos de UI
├── contexts/              # Contextos React (estado global)
├── hooks/                 # Custom hooks
├── pages/                 # Páginas/views
├── routes/                # Configuración de rutas
├── utils/                 # Utilidades y helpers
├── App.jsx               # Componente raíz
└── main.jsx              # Punto de entrada
```

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone [url-del-repositorio]
cd frontend-usuarios-dashboard
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

### 5. Construir para producción

```bash
npm run build
```

---

## 🧪 Testing

### Ejecutar tests

```bash
npm run test
```

### Ejecutar tests con interfaz UI

```bash
npm run test:ui
```

### Ejecutar tests con cobertura

```bash
npm run test:coverage
```

---

## 📦 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Previsualiza la build en local |
| `npm run test` | Ejecuta los tests |
| `npm run test:ui` | Ejecuta tests con interfaz visual |
| `npm run test:coverage` | Genera reporte de cobertura |
| `npm run lint` | Ejecuta ESLint |

---

## 🔌 Plugins de Vite

Este proyecto utiliza los siguientes plugins de Vite para React:

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)** - Usa Babel para Fast Refresh
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)** - Usa SWC para Fast Refresh

---

## 🔗 Integración con API

La aplicación se conecta con la API Laravel en:

```
Base URL: http://localhost:8000/api
```

Endpoints principales:
- `POST /api/login` - Autenticación
- `GET /api/users` - Listar usuarios
- `POST /api/users` - Crear usuario
- `PUT /api/users/{id}` - Actualizar usuario
- `DELETE /api/users/{id}` - Eliminar usuario
- `GET /api/statistics/*` - Estadísticas

---

## 📝 Variables de Entorno

Copia el archivo `.env.example` a `.env` y configura:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000
```

---

## 🎨 Personalización

### Temas y Colores

Los temas se configuran en `tailwind.config.js`. Puedes personalizar:
- Paleta de colores
- Tipografía
- Espaciados
- Breakpoints

### Componentes

Los componentes reutilizables están en `src/components/`. Sigue la estructura modular para mantener la organización.

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

---

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nombre-feature`)
3. Commit tus cambios (`git commit -m 'feat: descripción'`)
4. Push a la rama (`git push origin feature/nombre-feature`)
5. Abre un Pull Request

---

## 📞 Soporte

Para problemas o preguntas, abre un issue en el repositorio.
