import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  headerAction,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  padding = true,
  shadow = true,
  border = true,
  hover = false,
  ...props
}) => {
  return (
    <div
      className={`
        rounded-lg overflow-hidden
        ${border ? 'border border-gray-200 dark:border-gray-700' : ''}
        ${shadow ? 'shadow-sm' : ''}
        ${hover ? 'transition-all duration-200 hover:shadow-md' : ''}
        bg-white dark:bg-gray-800
        ${className}
      `}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className={`
          ${border ? 'border-b border-gray-200 dark:border-gray-700' : ''}
          ${padding ? 'px-6 py-4' : 'p-0'}
          ${headerClassName}
        `}>
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </div>
      )}
      
      <div className={`${padding ? 'px-6 py-4' : 'p-0'} ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`
          ${border ? 'border-t border-gray-200 dark:border-gray-700' : ''}
          ${padding ? 'px-6 py-4' : 'p-0'}
          bg-gray-50 dark:bg-gray-900
          ${footerClassName}
        `}>
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  footer: PropTypes.node,
  headerAction: PropTypes.node,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  padding: PropTypes.bool,
  shadow: PropTypes.bool,
  border: PropTypes.bool,
  hover: PropTypes.bool,
};

export default Card;