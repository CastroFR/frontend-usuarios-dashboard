import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useForm } from '../../hooks/useForm';
import { validators } from '../../utils/validators';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const { formData, errors, touched, handleChange, handleBlur, validateForm } = useForm(
    {
      name: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    {
      name: validators.required('El nombre es requerido'),
      email: validators.email,
      newPassword: (value) => {
        if (value && value.length < 6) {
          return 'La nueva contraseña debe tener al menos 6 caracteres';
        }
        return null;
      },
      confirmPassword: (value, formData) => {
        if (formData.newPassword && value !== formData.newPassword) {
          return 'Las contraseñas no coinciden';
        }
        return null;
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simular actualización
      setTimeout(() => {
        updateUser({ ...user, ...formData });
        setMessage({ 
          type: 'success', 
          text: 'Perfil actualizado correctamente' 
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Error al actualizar el perfil' 
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mi Perfil</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Administra tu información personal y configuración de cuenta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {message.text && (
                <div className={`rounded-lg p-4 ${
                  message.type === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400' 
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                }`}>
                  {message.text}
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
                  placeholder="Tu nombre"
                  required
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
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Cambiar contraseña
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Contraseña actual"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                  />

                  <Input
                    label="Nueva contraseña"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.newPassword}
                    touched={touched.newPassword}
                    placeholder="••••••••"
                  />

                  <Input
                    label="Confirmar nueva contraseña"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="submit"
                  loading={loading}
                >
                  Guardar cambios
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{user?.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              
              <div className="mt-6 w-full space-y-4">
                <div className="text-sm">
                  <p className="text-gray-500 dark:text-gray-400">Miembro desde</p>
                  <p className="font-medium">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Fecha no disponible'}
                  </p>
                </div>
                
                <div className="text-sm">
                  <p className="text-gray-500 dark:text-gray-400">Última actualización</p>
                  <p className="font-medium">
                    {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'Fecha no disponible'}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;