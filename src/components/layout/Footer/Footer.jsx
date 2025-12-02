import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Derechos */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} UserAdmin Dashboard. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Desarrollado con ❤️ por el equipo FSJ-30
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/privacy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Privacidad
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Términos
            </Link>
            <Link
              to="/help"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Ayuda
            </Link>
            <a
              href="https://github.com/tu-usuario/dashboard-usuarios-react"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Estado del sistema */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                Sistema Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;