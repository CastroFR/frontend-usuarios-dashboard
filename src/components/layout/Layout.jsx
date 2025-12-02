import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
            <p>{import.meta.env.VITE_APP_NAME || 'Dashboard'} © {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;