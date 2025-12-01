# 👥 Distribución de Trabajo - 3 Personas

Distribución equilibrada del trabajo para el desarrollo del Dashboard.

---

## 📋 Asignación por Persona

---

## 👤 PERSONA 1: Configuración Base y Autenticación

### Carpetas a cargo:

```
src/api/              # TODOS los servicios de API
src/contexts/         # TODOS los contextos de React
src/hooks/            # TODOS los custom hooks
src/routes/           # Configuración de rutas
src/store/            # Estado global (si se usa)
```

### Archivos clave a completar:

#### 1. `src/api/axiosConfig.js`

```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default axios.create({
  baseURL: API_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT || 10000
});
```

#### 2. `src/contexts/AuthContext.jsx` (ESENCIAL)

```javascript
import { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      // Llamar a API
      const response = await api.post('/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

#### 3. `src/routes/PrivateRoute.jsx`

```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  
  return user ? children : <Navigate to="/login" />;
}
```

#### 4. `src/api/userService.js`

```javascript
import api from './axiosConfig';

export const userService = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  restore: (id) => api.post(`/users/${id}/restore`),
  forceDelete: (id) => api.delete(`/users/${id}/force`)
};
```

---

## 🎨 PERSONA 2: Componentes UI y Layout

### Carpetas a cargo:

```
src/components/       # TODOS los componentes
  ├── common/        # Componentes genéricos
  ├── layout/        # Componentes de layout
  ├── ui/            # Componentes específicos de UI
src/assets/           # Estilos y recursos
```

### Archivos clave a completar:

#### 1. `src/components/common/Button.jsx`

```javascript
export default function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  ...props 
}) {
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`rounded font-medium transition ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
```

#### 2. `src/components/layout/Layout.jsx`

```javascript
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
```

#### 3. `src/components/common/Card.jsx`

```javascript
export default function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
}
```

#### 4. `src/assets/styles/global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom utilities */
@layer components {
  .btn-base {
    @apply font-medium rounded transition;
  }

  .card-base {
    @apply bg-white rounded-lg shadow;
  }

  .input-base {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
}
```

---

## 📄 PERSONA 3: Páginas y Vistas

### Carpetas a cargo:

```
src/pages/            # TODAS las páginas/vistas
  ├── Auth/
  ├── Dashboard/
  ├── Users/
  └── Statistics/
```

### Archivos clave a completar:

#### 1. `src/pages/Auth/Login.jsx`

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card title="Iniciar Sesión" className="w-96">
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-base"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
```

#### 2. `src/pages/Dashboard/Dashboard.jsx`

```javascript
import { useQuery } from 'react-query';
import { statisticsService } from '../../api/statisticsService';
import Card from '../../components/common/Card';
import StatCard from '../../components/ui/StatCard';
import Chart from '../../components/ui/Chart';

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery('stats', statisticsService.getSummary);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Usuarios Totales" value={stats?.total_users || 0} />
        <StatCard title="Usuarios Activos" value={stats?.active_users || 0} />
        <StatCard title="Registros Hoy" value={stats?.today_registrations || 0} />
        <StatCard title="Usuarios Eliminados" value={stats?.deleted_users || 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Registros por Mes">
          <Chart type="line" data={stats?.monthly_data} />
        </Card>
        <Card title="Registros por Semana">
          <Chart type="bar" data={stats?.weekly_data} />
        </Card>
      </div>
    </div>
  );
}
```

#### 3. `src/pages/Users/UsersList.jsx`

```javascript
import { useQuery } from 'react-query';
import { userService } from '../../api/userService';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import UserTable from '../../components/ui/UserTable';

export default function UsersList() {
  const { data: users, isLoading, refetch } = useQuery('users', userService.getAll);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <Button variant="primary">+ Nuevo Usuario</Button>
      </div>

      <Card>
        {isLoading ? <div>Cargando...</div> : <UserTable users={users} onRefresh={refetch} />}
      </Card>
    </div>
  );
}
```

---

## 🔄 Flujo de Trabajo Colaborativo

### 1. Inicializar Proyecto

```bash
npm create vite@latest frontend-usuarios-dashboard -- --template react
cd frontend-usuarios-dashboard
npm install
```

### 2. Instalación de Dependencias (todos)

```bash
npm install react-router-dom react-query axios tailwindcss postcss autoprefixer
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configuración Inicial

- **Persona 1**: Configura rutas y autenticación
- **Persona 2**: Prepara componentes base y estilos
- **Persona 3**: Crea estructura de páginas

### 4. Integración

- Realizar merges frecuentes
- Hacer pruebas en conjunto
- Mantener comunicación sobre cambios en interfaces

---

## 📌 Orden de Implementación Recomendado

1. **Fase 1** (Persona 1): API y Autenticación
2. **Fase 2** (Persona 2): Componentes y Estilos
3. **Fase 3** (Persona 3): Páginas y Vistas
4. **Fase 4** (Todos): Testing e Integración

---

## 🐛 Convenciones

- **Commits**: `feat: descripción` o `fix: descripción`
- **Ramas**: `feature/nombre-feature`
- **Componentes**: PascalCase en archivos JS
- **Funciones/Variables**: camelCase

---

## 📞 Comunicación

Mantener reuniones diarias de 15 minutos para sincronización y resolución de bloqueos.
