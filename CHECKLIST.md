# ✅ Checklist de Configuración Inicial

Este checklist ayuda a verificar que el proyecto está correctamente configurado.

## 🖥️ Requisitos del Sistema

- [ ] Node.js 18.0+ instalado → `node --version`
- [ ] npm 9.0+ instalado → `npm --version`
- [ ] Git instalado → `git --version`
- [ ] Editor de código (VS Code recomendado)

---

## 📦 Instalación

- [ ] Proyecto clonado del repositorio
- [ ] `npm install` ejecutado exitosamente
- [ ] No hay errores en la instalación
- [ ] Carpeta `node_modules/` creada
- [ ] Archivo `package-lock.json` presente y sin modificaciones

---

## 🔧 Configuración de Entorno

- [ ] Archivo `.env.example` existe
- [ ] Archivo `.env` creado (copiado desde `.env.example`)
- [ ] Variables de entorno configuradas:
  - [ ] `VITE_API_URL=http://localhost:8000/api`
  - [ ] `VITE_APP_NAME=Dashboard de Usuarios`
  - [ ] Otras variables completadas según necesidad

---

## 🔗 Backend/API

- [ ] Proyecto API Laravel clonado y configurado
- [ ] API está corriendo en `http://localhost:8000`
- [ ] CORS configurado correctamente
- [ ] Base de datos configurada y migrations ejecutadas
- [ ] API responde a solicitudes (probado en Postman o similar)

---

## 🚀 Servidor de Desarrollo

- [ ] `npm run dev` ejecutado sin errores
- [ ] Servidor iniciado en `http://localhost:5173`
- [ ] No hay conflictos de puertos
- [ ] Página carga correctamente en el navegador
- [ ] Hot reload funciona (cambios se reflejan en vivo)

---

## 🧪 Configuración de Herramientas

- [ ] **Tailwind CSS v3**: Estilos carguen correctamente
- [ ] **ESLint**: Sin errores de linting
  - Ejecutar: `npm run lint`
- [ ] **Prettier**: Código formateado correctamente
- [ ] **Vite**: Build y preview funcionan
  - Compilar: `npm run build`
  - Previsualizar: `npm run preview`

---

## 🔐 Seguridad

- [ ] `.env` NO está commiteado (está en `.gitignore`)
- [ ] `.env.example` SÍ está commiteado (plantilla pública)
- [ ] No hay credenciales reales en archivos versionados
- [ ] Git status no muestra `.env` como modificado

```bash
# Verificar:
git status
# No debe mostrar .env en cambios
```

---

## 📱 Funcionalidad Básica

- [ ] Login/Autenticación funciona
- [ ] Dashboard carga correctamente
- [ ] Listado de usuarios se muestra
- [ ] CRUD de usuarios funciona:
  - [ ] Crear usuario
  - [ ] Leer/Listar usuarios
  - [ ] Actualizar usuario
  - [ ] Eliminar usuario
- [ ] Estadísticas cargan
- [ ] Modo oscuro/claro cambia

---

## 🎨 Interfaz

- [ ] Diseño se ve correcto en desktop
- [ ] Diseño responsivo en tablet (768px)
- [ ] Diseño responsivo en móvil (320px)
- [ ] Colores y temas se ven bien
- [ ] Iconos cargan correctamente
- [ ] Fuentes se ven bien

---

## 📚 Documentación

- [ ] **README.md** leído completamente
- [ ] **SETUP.md** disponible para consultar
- [ ] **GIT_CONFIG.md** explica archivos tracked/ignorados
- [ ] **QUICKSTART.md** funciona como referencia rápida

---

## 🔄 Flujo de Trabajo Git

- [ ] Rama `main` actualizada
- [ ] Branch naming convention entendido
  - `feature/nombre-feature`
  - `fix/nombre-fix`
  - `docs/nombre-doc`
- [ ] Commit messages claros
- [ ] `.gitignore` excluye archivos correctamente

```bash
# Verificar qué archivos se subirían:
git status
# Verificar qué se ignora:
git check-ignore -v .env node_modules
```

---

## 🧪 Tests (Opcional)

- [ ] Tests corren sin errores
  - `npm run test`
- [ ] Coverage report genera
  - `npm run test:coverage`
- [ ] Tests relacionados con cambios pasan

---

## 🐛 Posibles Problemas y Soluciones

### Puerto 5173 ya en uso
```bash
npm run dev -- --port 3000
```

### Módulos no encontrados
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS errors desde API
- Verifica CORS configurado en backend
- Verifica `VITE_API_URL` es correcto
- Verifica API está corriendo

### Cambios no se reflejan
```bash
npm run dev -- --force
```

### Variables de entorno no se cargan
- Asegúrate que `.env` existe (no `.env.example`)
- Nombres de variables comienzan con `VITE_`
- Reinicia servidor de desarrollo

---

## 📋 Resumen Final

| Aspecto | Estado | Nota |
|---------|--------|------|
| Instalación | ✅/❌ | Dependencies OK? |
| Configuración | ✅/❌ | .env configurado? |
| API Backend | ✅/❌ | Corriendo en localhost:8000? |
| Servidor Dev | ✅/❌ | Corriendo en localhost:5173? |
| Funcionalidad | ✅/❌ | Login y CRUD funcionan? |
| Seguridad | ✅/❌ | .env ignorado y .env.example presente? |
| Documentación | ✅/❌ | README/SETUP leídos? |

---

## ✨ ¡Todo Listo!

Si marcaste todas las casillas ✅, **¡tu entorno está configurado correctamente!**

Ahora puedes:
1. Empezar a desarrollar
2. Crear cambios en tu feature branch
3. Hacer commits descriptivos
4. Abrir Pull Requests para review

**¡Bienvenido al proyecto!** 🚀

---

**Fecha de Verificación:** 2025-12-02
**Versión del Proyecto:** 1.0.0
**Versión de Node Required:** 18.0+
**Versión de npm Required:** 9.0+
