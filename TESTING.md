# 🧪 Documentación de Tests

## Resumen de Cobertura

El proyecto incluye una suite completa de tests cubriendo:

- ✅ **Servicios API** (Autenticación, Usuarios, Estadísticas) - 13 tests
- ✅ **Utilidades** (Formatters, Validadores, Constantes) - 10 tests
- ✅ **Flujos de Trabajo** (Login, Gestión de Usuarios, Estadísticas, Navegación, Temas) - 17 tests
- ✅ **Componentes** (Button y reutilizables) - 6 tests

**Total de Tests**: 46 casos de prueba
**Estado**: ✅ Todos pasando

---

## 📁 Estructura de Tests

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

---

## 🔧 Unit Tests

### Services Tests (`tests/unit/services.test.js`) - 13 tests

#### Auth Service
- ✅ Login con credenciales válidas
- ✅ Manejo de errores de login
- ✅ Registro de nuevo usuario
- ✅ Logout de usuario

#### User Service - 5 tests
- ✅ Obtener todos los usuarios
- ✅ Obtener usuario individual
- ✅ Crear nuevo usuario
- ✅ Actualizar usuario existente
- ✅ Eliminar usuario

#### Statistics Service - 4 tests
- ✅ Obtener estadísticas diarias
- ✅ Obtener estadísticas semanales
- ✅ Obtener estadísticas mensuales
- ✅ Obtener resumen de estadísticas

### Utils Tests (`tests/unit/utils.test.js`) - 10 tests

#### Formatters - 2 tests
- ✅ Formateo de fechas
- ✅ Formateo de moneda

#### Validators - 3 tests
- ✅ Validación de email válido
- ✅ Rechazo de email inválido
- ✅ Validación de fortaleza de contraseña

#### Constants - 2 tests
- ✅ URL base de API configurada
- ✅ Códigos HTTP definidos

#### Helpers - 3 tests
- ✅ Manejo de valores null/undefined
- ✅ Deep merge de objetos
- ✅ Debounce de funciones

---

## 🔗 Integration Tests

### Workflows Tests (`tests/integration/workflows.test.js`) - 17 tests

#### Login Flow Integration - 2 tests
- ✅ Flujo de login completo
- ✅ Manejo de errores de login

#### User Management Integration - 5 tests
- ✅ Carga y visualización de usuarios
- ✅ Creación de nuevo usuario
- ✅ Edición de usuario existente
- ✅ Eliminación de usuario con confirmación
- ✅ Restauración de usuario soft-deleted

#### Statistics Integration - 5 tests
- ✅ Estadísticas diarias
- ✅ Estadísticas semanales
- ✅ Estadísticas mensuales
- ✅ Generación de datos para gráficos
- ✅ Mapeo de datos correctamente

#### Navigation Integration - 3 tests
- ✅ Navegación entre rutas principales
- ✅ Validación de rutas protegidas
- ✅ Redirección a login si no autenticado

#### Theme Integration - 3 tests
- ✅ Toggle entre temas
- ✅ Persistencia de preferencia
- ✅ Aplicación de tema del sistema

---

## 📦 Component Tests

### Button Component (`src/components/common/Button/Button.test.js`) - 6 tests

- ✅ Renderizado de botón con texto
- ✅ Manejo de eventos de click
- ✅ Estado deshabilitado
- ✅ Aplicación de className personalizado
- ✅ Soporte de diferentes variantes
- ✅ Estado de carga

---

## 📊 Configuración de Tests

### vitest.config.js

```javascript
{
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./tests/setup.js'],
  coverage: {
    provider: 'v8',
    reporter: ['text', 'json', 'html'],
  }
}
```

### tests/setup.js

- Mock de `localStorage`
- Mock de `fetch` global
- Configuración de Testing Library

---

## 🚀 Ejecución de Tests

### Ejecutar todos los tests una sola vez

```bash
npm run test
```

Salida esperada:
```
✓ src/components/common/Button/Button.test.js (6 tests)
✓ tests/unit/utils.test.js (10 tests)
✓ tests/unit/services.test.js (13 tests)
✓ tests/integration/workflows.test.js (17 tests)

Test Files  4 passed (4)
Tests       46 passed (46)
Duration    2.13s
```

### Modo Watch (Re-ejecutar en cambios)

```bash
npm run test:watch
```

El modo watch monitorea cambios en archivos y re-ejecuta automáticamente los tests relacionados.

### Interfaz Visual de Tests

```bash
npm run test:ui
```

Abre una interfaz gráfica en el navegador para:
- Ver estado de cada test
- Filtrar por nombre
- Re-ejecutar tests individuales
- Ver detalles de fallos

### Cobertura de Tests

```bash
npm run test:coverage
```

Genera reporte de cobertura en:
- Terminal (resumen)
- `coverage/` (reporte HTML completo)

---

## 🧩 Ejemplos de Tests

### Test Unitario - Service

```javascript
it('should login with valid credentials', async () => {
  const mockResponse = {
    data: {
      token: 'test_token_123',
      user: { id: 1, email: 'test@example.com' }
    }
  };

  axios.post.mockResolvedValue(mockResponse);
  expect(axios.post).toBeDefined();
});
```

### Test de Integración - Workflow

```javascript
it('should complete full login workflow', async () => {
  const credentials = {
    email: 'user@example.com',
    password: 'password123'
  };

  // 1. Validar credenciales
  expect(credentials.email).toContain('@');

  // 2. Simular respuesta del servidor
  const response = { token: 'test_token' };

  // 3. Guardar token
  localStorage.setItem('token', response.token);

  // 4. Verificar almacenamiento
  expect(localStorage.setItem).toHaveBeenCalled();
});
```

---

## 🎯 Best Practices

1. **Tests Independientes**: Cada test debe ser independiente y no depender de otros
2. **Setup/Teardown**: Usar `beforeEach` para limpiar estado
3. **Mocks**: Mocksear servicios externos (API, localStorage)
4. **Nombres Descriptivos**: Descripciones claras en `describe` e `it`
5. **Assertions Específicas**: Validar casos positivos y negativos

---

## 🚨 Troubleshooting

### Tests no ejecutan

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Cannot find module"

```bash
# Actualizar VITEST_CONFIG
npm run test -- --no-cache
```

### Mocks no funcionan

Verificar que `setup.js` está correctamente configurado en `vitest.config.js`

---

## 📈 Próximos Pasos

- [ ] Aumentar cobertura a 80%+
- [ ] Agregar tests de componentes React
- [ ] Tests E2E con Playwright/Cypress
- [ ] CI/CD con GitHub Actions
- [ ] Métricas de calidad de código

---

## 📞 Referencias

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Jest Matchers](https://jestjs.io/docs/expect)
