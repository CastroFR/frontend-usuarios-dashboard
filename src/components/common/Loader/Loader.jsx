import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ 
  size = 'medium', 
  color = 'primary', 
  fullScreen = false,
  text = 'Cargando...'
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16',
  };

  const colorClasses = {
    primary: 'border-primary-500',
    white: 'border-white',
    gray: 'border-gray-500',
    success: 'border-green-500',
    error: 'border-red-500',
    warning: 'border-yellow-500',
  };

  const Wrapper = fullScreen ? 'div' : React.Fragment;
  const wrapperProps = fullScreen ? {
    className: 'fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50'
  } : {};

  return (
    <Wrapper {...wrapperProps}>
      <div className="flex flex-col items-center justify-center space-y-3">
        <div
          className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">{text}</span>
        </div>
        {text && (
          <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
            {text}
          </p>
        )}
      </div>
    </Wrapper>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  color: PropTypes.oneOf(['primary', 'white', 'gray', 'success', 'error', 'warning']),
  fullScreen: PropTypes.bool,
  text: PropTypes.string,
};

export default Loader;