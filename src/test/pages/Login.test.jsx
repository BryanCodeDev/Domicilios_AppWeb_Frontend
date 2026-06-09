import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/auth/Login.jsx';
import { useAuthStore } from '../../store/authStore';

vi.mock('../../store/authStore');

describe('Login', () => {
  it('shows validation errors when submitting empty', async () => {
    useAuthStore.mockReturnValue({ login: vi.fn(), isAuthenticated: false });
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    expect(await screen.findAllByText(/requerido/i)).toHaveLength(2);
  });
});

