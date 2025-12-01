import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Puedes enviar el error a un servicio de tracking aquí
    console.error('ErrorBoundary capturó un error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
    
    // Opcional: recargar la página
    // window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full card">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                <svg 
                  className="h-6 w-6 text-red-600 dark:text-red-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                  />
                </svg>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Algo salió mal
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Lo sentimos, ha ocurrido un error inesperado. 
                Puedes intentar recargar la página o contactar al soporte.
              </p>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-4 text-left">
                <p className="text-sm font-mono text-red-800 dark:text-red-300 break-all">
                  {this.state.error?.toString()}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleReset}
                  className="btn-primary flex-1"
                >
                  Reintentar
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="btn-secondary flex-1"
                >
                  Recargar página
                </button>
              </div>

              {import.meta.env.DEV && this.state.errorInfo && (
                <details className="mt-4 text-left">
                  <summary className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer">
                    Ver detalles técnicos
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-auto max-h-60">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;