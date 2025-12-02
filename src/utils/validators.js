export const validators = {
  required: (message = 'Este campo es requerido') => 
    (value) => {
      if (value === undefined || value === null || value === '') {
        return message;
      }
      if (typeof value === 'string' && value.trim() === '') {
        return message;
      }
      return null;
    },

  email: (value) => {
    if (!value) return 'El email es requerido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Email inválido' : null;
  },

  password: (value) => {
    if (!value) return 'La contraseña es requerida';
    if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return null;
  },

  minLength: (min, message = `Mínimo ${min} caracteres`) =>
    (value) => value && value.length < min ? message : null,

  maxLength: (max, message = `Máximo ${max} caracteres`) =>
    (value) => value && value.length > max ? message : null,

  numeric: (message = 'Debe ser un número') =>
    (value) => value && isNaN(Number(value)) ? message : null,

  minValue: (min, message = `El valor mínimo es ${min}`) =>
    (value) => value && Number(value) < min ? message : null,

  maxValue: (max, message = `El valor máximo es ${max}`) =>
    (value) => value && Number(value) > max ? message : null,

  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^[0-9]{10}$/;
    return !phoneRegex.test(value.replace(/\D/g, '')) ? 'Teléfono inválido (10 dígitos)' : null;
  },

  url: (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return 'URL inválida';
    }
  },

  match: (fieldName, message = 'Los valores no coinciden') =>
    (value, formData) => value !== formData[fieldName] ? message : null,

  custom: (validator, message = 'Valor inválido') =>
    (value) => validator(value) ? null : message,
};