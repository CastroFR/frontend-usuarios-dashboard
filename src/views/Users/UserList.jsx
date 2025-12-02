import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Card from '../../components/common/Card';
import { formatDate } from '../../utils/helpers';

const UserList = () => {
  const {
    users,
    loading,
    error,
    pagination,
    fetchUsers,
    deleteUser,
    restoreUser,
    forceDeleteUser,
  } = useUsers();

  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showForceDeleteModal, setShowForceDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('active'); // 'active', 'deleted', 'all'

  useEffect(() => {
    const params = {
      page: currentPage,
      search: searchTerm,
      ...(viewMode === 'deleted' && { deleted: true }),
      ...(viewMode === 'active' && { deleted: false }),
      _t: Date.now() // Agrega timestamp para evitar caché
    };

    console.log('Fetching users con params:', params);
    fetchUsers(params);
  }, [currentPage, searchTerm, viewMode]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleRestoreClick = (user) => {
    setSelectedUser(user);
    setShowRestoreModal(true);
  };

  const handleForceDeleteClick = (user) => {
    setSelectedUser(user);
    setShowForceDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id);
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  const handleRestoreConfirm = async () => {
    if (selectedUser) {
      await restoreUser(selectedUser.id);
      setShowRestoreModal(false);
      setSelectedUser(null);
    }
  };

  const handleForceDeleteConfirm = async () => {
    if (selectedUser) {
      await forceDeleteUser(selectedUser.id);
      setShowForceDeleteModal(false);
      setSelectedUser(null);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (!pagination || pagination.total <= pagination.per_page) return null;

    const totalPages = Math.ceil(pagination.total / pagination.per_page);
    const pages = [];

    // Mostrar siempre primera página, última página y páginas alrededor de la actual
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      }
    }

    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
        <div className="text-sm text-gray-700 dark:text-gray-400">
          Mostrando {((currentPage - 1) * pagination.per_page) + 1} a{' '}
          {Math.min(currentPage * pagination.per_page, pagination.total)} de{' '}
          {pagination.total} resultados
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </Button>

          <div className="flex items-center space-x-1">
            {pages.map((page, index) => {
              if (index > 0 && page - pages[index - 1] > 1) {
                return (
                  <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-500">
                    ...
                  </span>
                );
              }
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Usuarios</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Administra los usuarios del sistema
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-full sm:w-64">
            <Input
              type="search"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={handleSearch}
              leftIcon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>
          <Link to="/users/new">
            <Button>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Usuario
            </Button>
          </Link>
        </div>
      </div>

      {/* Filtros de vista */}
      <div className="flex space-x-2">
        <Button
          variant={viewMode === 'active' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setViewMode('active')}
        >
          Activos
        </Button>
        <Button
          variant={viewMode === 'deleted' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setViewMode('deleted')}
        >
          Eliminados
        </Button>
        <Button
          variant={viewMode === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setViewMode('all')}
        >
          Todos
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <Card>
        {loading ? (
          <div className="space-y-4 py-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
              {viewMode === 'deleted' ? '🗑️' : '👤'}
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'No se encontraron resultados' : 'No hay usuarios'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm
                ? 'Intenta con otros términos de búsqueda'
                : viewMode === 'deleted'
                  ? 'No hay usuarios eliminados'
                  : 'No hay usuarios registrados aún'}
            </p>
            {!searchTerm && viewMode === 'active' && (
              <Link to="/users/new">
                <Button>Crear primer usuario</Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Registrado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ID: {user.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{user.email}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email_verified_at ? 'Verificado' : 'No verificado'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.deleted_at
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            }`}>
                            {user.deleted_at ? 'Eliminado' : 'Activo'}
                          </span>
                          {user.deleted_at && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(user.deleted_at)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-2">
                          {!user.deleted_at ? (
                            <>
                              <Link to={`/users/${user.id}/edit`}>
                                <Button variant="secondary" size="sm">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Editar
                                </Button>
                              </Link>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteClick(user)}
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Eliminar
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleRestoreClick(user)}
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                </svg>
                                Restaurar
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleForceDeleteClick(user)}
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Eliminar Permanentemente
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {renderPagination()}
          </>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar eliminación"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Eliminar
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            ¿Estás seguro de eliminar al usuario{' '}
            <span className="font-semibold">{selectedUser?.name}</span>?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            El usuario será marcado como eliminado y podrá ser restaurado más tarde.
          </p>
        </div>
      </Modal>

      {/* Restore Confirmation Modal */}
      <Modal
        isOpen={showRestoreModal}
        onClose={() => setShowRestoreModal(false)}
        title="Restaurar usuario"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowRestoreModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleRestoreConfirm}>
              Restaurar
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            ¿Restaurar al usuario{' '}
            <span className="font-semibold">{selectedUser?.name}</span>?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            El usuario volverá a estar activo en el sistema.
          </p>
        </div>
      </Modal>

      {/* Force Delete Confirmation Modal */}
      <Modal
        isOpen={showForceDeleteModal}
        onClose={() => setShowForceDeleteModal(false)}
        title="Eliminar permanentemente"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowForceDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleForceDeleteConfirm}>
              Eliminar Permanentemente
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            ¿Eliminar permanentemente al usuario{' '}
            <span className="font-semibold">{selectedUser?.name}</span>?
          </p>
          <p className="text-sm text-red-600 dark:text-red-400">
            ¡Esta acción no se puede deshacer! Todos los datos del usuario serán eliminados permanentemente.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default UserList;