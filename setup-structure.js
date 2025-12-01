const fs = require('fs');
const path = require('path');

const structure = {
  'src/api': [
    'axiosConfig.js',
    'authService.js',
    'userService.js',
    'statisticsService.js',
    'index.js'
  ],
  'src/assets/styles': [
    'global.css',
    'theme.css'
  ],
  'src/components/common/Button': [
    'Button.jsx',
    'Button.styles.js',
    'Button.test.js'
  ],
  'src/components/common': [
    'Input/Input.jsx',
    'Modal/Modal.jsx',
    'Table/Table.jsx',
    'Card/Card.jsx',
    'Chart/Chart.jsx',
    'Loader/Loader.jsx',
    'Alert/Alert.jsx'
  ],
  'src/components/layout': [
    'Header/Header.jsx',
    'Sidebar/Sidebar.jsx',
    'Footer/Footer.jsx',
    'Layout.jsx'
  ],
  'src/contexts': [
    'AuthContext.jsx',
    'ThemeContext.jsx',
    'NotificationContext.jsx'
  ],
  'src/hooks': [
    'useAuth.js',
    'useUsers.js',
    'useStatistics.js',
    'useLocalStorage.js',
    'useForm.js'
  ],
  'src/routes': [
    'PrivateRoute.jsx',
    'PublicRoute.jsx',
    'AppRoutes.jsx',
    'index.js'
  ],
  'src/store/slices': [],
  'src/store': [
    'index.js'
  ],
  'src/utils': [
    'validators.js',
    'formatters.js',
    'constants.js',
    'helpers.js',
    'errorHandlers.js'
  ],
  'src/views/Auth': [
    'Login.jsx',
    'Register.jsx',
    'ForgotPassword.jsx'
  ],
  'src/views/Dashboard': [
    'Dashboard.jsx',
    'Overview.jsx',
    'Analytics.jsx'
  ],
  'src/views/Users': [
    'UserList.jsx',
    'UserCreate.jsx',
    'UserEdit.jsx',
    'UserView.jsx'
  ],
  'src/views/Statistics': [
    'Statistics.jsx',
    'DailyStats.jsx',
    'WeeklyStats.jsx',
    'MonthlyStats.jsx'
  ],
  'src/views/Profile': [
    'Profile.jsx'
  ],
  'src/views/Settings': [
    'Settings.jsx'
  ],
  'tests/unit': [
    'Auth.test.js',
    'Button.test.js'
  ],
  'tests/integration': [
    'Login.test.js',
    'Dashboard.test.js'
  ]
};

// Crear carpetas y archivos
Object.keys(structure).forEach(dir => {
  // Crear directorio si no existe
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Creada carpeta: ${dir}`);
  }

  // Crear archivos dentro del directorio
  structure[dir].forEach(file => {
    const filePath = path.join(dir, file);
    
    // Si el archivo está en un subdirectorio
    if (file.includes('/')) {
      const subDir = path.join(dir, path.dirname(file));
      if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir, { recursive: true });
      }
    }

    // Crear archivo vacío si no existe
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '// Archivo creado automáticamente\n');
      console.log(`  ↳ Creado archivo: ${filePath}`);
    }
  });
});

// Crear archivos en raíz
const rootFiles = {
  '.env.example': `VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Dashboard de Usuarios
VITE_ENABLE_DARK_MODE=true`,
  
  '.env': `# Variables locales - NO SUBIR A GITHUB
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Dashboard de Usuarios
VITE_ENABLE_DARK_MODE=true`,
  
  'CONTRIBUTING.md': `# Guía de Contribución
## Para el equipo de 3 personas
...`,
  
  'TEAM_SETUP.md': `# Configuración para el Equipo
## Instrucciones específicas para 3 personas
...`
};

Object.keys(rootFiles).forEach(file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, rootFiles[file]);
    console.log(`✓ Creado archivo: ${file}`);
  }
});

console.log('\n🎉 ¡Estructura completada!');