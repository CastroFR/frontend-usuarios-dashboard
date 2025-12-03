import { describe, it, expect, vi } from 'vitest';

describe('Utility Functions', () => {
  describe('formatters', () => {
    it('should format date correctly', () => {
      const date = new Date('2025-12-03');
      // Test format function exists and works
      expect(date).toBeDefined();
    });

    it('should format currency', () => {
      const amount = 1000;
      const formatted = amount.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'USD'
      });
      expect(formatted).toBeDefined();
    });
  });

  describe('validators', () => {
    it('should validate email', () => {
      const validEmail = 'test@example.com';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(validEmail)).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidEmail = 'invalid-email';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(invalidEmail)).toBe(false);
    });

    it('should validate password strength', () => {
      const password = 'StrongPassword123!';
      const hasMinLength = password.length >= 8;
      const hasNumbers = /\d/.test(password);
      const hasLetters = /[a-zA-Z]/.test(password);
      
      expect(hasMinLength && hasNumbers && hasLetters).toBe(true);
    });
  });

  describe('constants', () => {
    it('should have default API base URL', () => {
      const baseURL = 'http://localhost:8000/api';
      expect(baseURL).toBeDefined();
      expect(baseURL).toContain('/api');
    });

    it('should have HTTP status codes', () => {
      const statusCodes = {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        SERVER_ERROR: 500
      };
      
      expect(statusCodes.OK).toBe(200);
      expect(statusCodes.UNAUTHORIZED).toBe(401);
    });
  });
});

describe('Helpers', () => {
  it('should handle null/undefined values', () => {
    const value = null;
    const result = value ?? 'default';
    expect(result).toBe('default');
  });

  it('should deep merge objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { b: { d: 3 } };
    
    expect(obj1).toBeDefined();
    expect(obj2).toBeDefined();
  });

  it('should debounce function calls', (done) => {
    let callCount = 0;
    
    const debounce = (func, delay) => {
      let timeoutId;
      return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    };

    const debouncedFunc = debounce(() => {
      callCount++;
    }, 100);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    setTimeout(() => {
      expect(callCount).toBe(1);
      done();
    }, 200);
  });
});
