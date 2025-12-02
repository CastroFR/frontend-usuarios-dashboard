import { useState, useCallback } from 'react';

export const useForm = (initialState = {}, validators = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;

    let newValue;
    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'file') {
      newValue = files[0];
    } else if (type === 'number') {
      newValue = value === '' ? '' : Number(value);
    } else {
      newValue = value;
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));

    // Validar campo al cambiar si está marcado como touched
    if (touched[name] && validators[name] && typeof validators[name] === 'function') {

      const error = validators[name](newValue, formData);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  }, [validators, touched, formData]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    // Validar campo al salir solo si es una función
    if (validators[name] && typeof validators[name] === 'function') {
      const error = validators[name](formData[name], formData);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  }, [validators, formData]);

  const setFieldValue = useCallback((name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setTouched({});
  }, [initialState]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    Object.keys(validators).forEach(key => {
      // Solo validar si el validador es una función
      if (validators[key] && typeof validators[key] === 'function') {
        const error = validators[key](formData[key], formData);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validators).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    return Object.keys(newErrors).length === 0;
  }, [formData, validators]);

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm,
    validateForm,
    setFormData,
    setErrors,
    setTouched,
  };
};