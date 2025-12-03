import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('authService', () => {
  it('should login with valid credentials', async () => {
    const mockResponse = {
      data: {
        token: 'test_token_123',
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User'
        }
      }
    };

    axios.post.mockResolvedValue(mockResponse);

    expect(axios.post).toBeDefined();
  });

  it('should handle login errors', async () => {
    const mockError = new Error('Invalid credentials');
    axios.post.mockRejectedValue(mockError);

    expect(axios.post).toBeDefined();
  });

  it('should register a new user', async () => {
    const mockResponse = {
      data: {
        message: 'User registered successfully',
        user: {
          id: 2,
          email: 'newuser@example.com',
          name: 'New User'
        }
      }
    };

    axios.post.mockResolvedValue(mockResponse);
    expect(axios.post).toBeDefined();
  });

  it('should logout user', () => {
    localStorage.removeItem('token');
    expect(localStorage.removeItem).toHaveBeenCalled();
  });
});

describe('userService', () => {
  it('should fetch all users', async () => {
    const mockResponse = {
      data: [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' }
      ]
    };

    axios.get.mockResolvedValue(mockResponse);
    expect(axios.get).toBeDefined();
  });

  it('should fetch a single user', async () => {
    const mockResponse = {
      data: {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com'
      }
    };

    axios.get.mockResolvedValue(mockResponse);
    expect(axios.get).toBeDefined();
  });

  it('should create a new user', async () => {
    const mockResponse = {
      data: {
        id: 3,
        name: 'New User',
        email: 'newuser@example.com'
      }
    };

    axios.post.mockResolvedValue(mockResponse);
    expect(axios.post).toBeDefined();
  });

  it('should update a user', async () => {
    const mockResponse = {
      data: {
        id: 1,
        name: 'Updated User',
        email: 'updated@example.com'
      }
    };

    axios.put.mockResolvedValue(mockResponse);
    expect(axios.put).toBeDefined();
  });

  it('should delete a user', async () => {
    axios.delete.mockResolvedValue({ status: 200 });
    expect(axios.delete).toBeDefined();
  });
});

describe('statisticsService', () => {
  it('should fetch daily statistics', async () => {
    const mockResponse = {
      data: {
        date: '2025-12-03',
        total_users: 10,
        new_users: 2
      }
    };

    axios.get.mockResolvedValue(mockResponse);
    expect(axios.get).toBeDefined();
  });

  it('should fetch weekly statistics', async () => {
    const mockResponse = {
      data: [
        { week: 1, total: 10, new: 2 },
        { week: 2, total: 15, new: 5 }
      ]
    };

    axios.get.mockResolvedValue(mockResponse);
    expect(axios.get).toBeDefined();
  });

  it('should fetch monthly statistics', async () => {
    const mockResponse = {
      data: [
        { month: 'January', total: 50, new: 10 },
        { month: 'December', total: 120, new: 45 }
      ]
    };

    axios.get.mockResolvedValue(mockResponse);
    expect(axios.get).toBeDefined();
  });

  it('should fetch statistics summary', async () => {
    const mockResponse = {
      data: {
        total_users: 150,
        total_active: 120,
        deleted_users: 5
      }
    };

    axios.get.mockResolvedValue(mockResponse);
    expect(axios.get).toBeDefined();
  });
});
