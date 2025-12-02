import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';
import { useForm } from '../../hooks/useForm';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { validators } from '../../utils/validators';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { createUser, updateUser, users, loading: usersLoading } = useUsers();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const { formData, errors, touched, handleChange, handleBlur, validateForm, setFormData, resetForm } = useForm(
    {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    {
      name: validators.required('El nombre es requerido'),
      email: validators.email,
      password: isEdit ? null : validators.password,
      password_confirmation: isEdit ? null : (value, formData) => {
        if (!value) return 'La confirmación de contraseña es requerida';
        if (value !== formData.password) return 'Las contraseñas no coinciden';
        return null;
      },
    }
  );

  useEffect(() => {
    if (isEdit && id && users.length > 0) {
      const existingUser = users.find(u => u.id === parseInt(id));
      if (existingUser) {
        setUser(existingUser);
        setFormData({
          name: existingUser.name || '',
          email: existingUser.email || '',
          password: '',
          password_confirmation: '',
        });
      }
    }
  }, [id, users, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const userData = { ...formData };
      
      // Si estamos editando y no se cambió la contraseña, quitamos los campos
      if (isEdit) {
        if (!userData.password) {
          delete userData.password;
          delete userData.password_confirmation;
        }
        
        await updateUser(id, userData);
      } else {
        await createUser(userData);
      }

      navigate('/users');
    } catch (err) {
      setError(err.message || `Error al ${isEdit ? 'actualizar' : 'crear'} usuario`);
      
      if (err.errors) {
        const backendErrors = Object.values(err.errors).flat();
        setError(backendErrors[0] || `Error al ${isEdit ? 'actualizar' : 'crear'} usuario`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    navigate('/users');
  };

  if (isEdit && usersLoading && !user) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {isEdit ? 'Actualiza la información del usuario' : 'Agrega un nuevo usuario al sistema'}
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nombre completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              placeholder="Ej: Juan Pérez"
              required
              leftIcon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              placeholder="Ej: correo@ejemplo.com"
              required
              leftIcon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              placeholder="••••••••"
              required={!isEdit}
              helperText={isEdit ? "Dejar en blanco para mantener la contraseña actual" : "Mínimo 8 caracteres"}
              leftIcon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            <Input
              label="Confirmar contraseña"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password_confirmation}
              touched={touched.password_confirmation}
              placeholder="••••••••"
              required={!isEdit}
              helperText={isEdit ? "Dejar en blanco para mantener la contraseña actual" : ""}
              leftIcon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />
          </div>

          {isEdit && user && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Información adicional</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">ID</p>
                  <p className="font-medium">{user.id}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Creado</p>
                  <p className="font-medium">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Actualizado</p>
                  <p className="font-medium">
                    {new Date(user.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Estado</p>
                  <p className={`font-medium ${user.deleted_at ? 'text-red-600' : 'text-green-600'}`}>
                    {user.deleted_at ? 'Eliminado' : 'Activo'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={loading}
            >
              {isEdit ? 'Actualizar Usuario' : 'Crear Usuario'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserForm;