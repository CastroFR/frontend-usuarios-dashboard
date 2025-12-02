import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center">
          <div className="text-6xl text-primary-500 mb-4">404</div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Página no encontrada
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          
          <div className="space-y-4">
            <Link to="/dashboard">
              <Button fullWidth>
                Volver al Dashboard
              </Button>
            </Link>
            
            <Link to="/">
              <Button variant="outline" fullWidth>
                Ir al inicio
              </Button>
            </Link>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Si crees que esto es un error, por favor contacta al administrador.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;