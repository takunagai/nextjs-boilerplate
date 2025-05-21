import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from '../login-form';
import { useAuth } from '@/hooks/useAuth';
import { useLoginForm } from '@/hooks/useLoginForm';
import { useRouter } from 'next/navigation';

// Mock dependencies
vi.mock('@/hooks/useAuth');
vi.mock('@/hooks/useLoginForm');
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Typedefs for mocks
const mockUseAuth = useAuth as vi.MockedFunction<typeof useAuth>;
const mockUseLoginForm = useLoginForm as vi.MockedFunction<typeof useLoginForm>;
const mockUseRouter = useRouter as vi.MockedFunction<typeof useRouter>;

const mockPush = vi.fn();
const mockReplace = vi.fn();
const mockHandleLoginGlobal = vi.fn();
const mockResetErrorGlobal = vi.fn();

// Define a base return value for the `form` object returned by `useLoginForm`
const defaultMockFormObject = {
  register: vi.fn((fieldName: string) => ({
    name: fieldName,
    onChange: vi.fn(async () => {}),
    onBlur: vi.fn(async () => {}),
    ref: vi.fn(),
  })),
  handleSubmit: vi.fn((fn) => (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    return fn({ email: 'default@example.com', password: 'defaultPassword' });
  }),
  formState: { errors: {} },
  watch: vi.fn(() => ({ unsubscribe: vi.fn() })), // Added watch mock
};

// Define a base return value for useLoginForm
const defaultMockUseLoginFormReturnValue = {
  form: defaultMockFormObject, // Nested form object
  isLoading: false,
  error: null,
  handleLogin: mockHandleLoginGlobal,
  resetError: mockResetErrorGlobal,
};

describe('LoginForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isAuthLoading: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
      signup: vi.fn(),
    });

    mockUseLoginForm.mockReturnValue(defaultMockUseLoginFormReturnValue);

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: mockReplace,
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
      refresh: vi.fn(),
    });
  });

  it('renders correctly', () => {
    render(<LoginForm />);
    // The CardTitle component renders as a div by default, not a heading role.
    // Querying by text is more robust here.
    expect(screen.getByText('メールアドレスでログイン')).toBeInTheDocument();
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'パスワードをお忘れですか？' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '新規登録' })).toBeInTheDocument();
  });

  describe('Input Validation', () => {
    it('displays email validation error', () => {
      const emailErrorMessage = '有効なメールアドレスを入力してください。';
      mockUseLoginForm.mockReturnValueOnce({
        ...defaultMockUseLoginFormReturnValue,
        form: {
          ...defaultMockFormObject,
          formState: { errors: { email: { message: emailErrorMessage } } },
        },
      });
      render(<LoginForm />);
      expect(screen.getByText(emailErrorMessage)).toBeInTheDocument();
    });

    it('displays password validation error', () => {
      const passwordErrorMessage = 'パスワードを入力してください。';
      mockUseLoginForm.mockReturnValueOnce({
        ...defaultMockUseLoginFormReturnValue,
        form: {
          ...defaultMockFormObject,
          formState: { errors: { password: { message: passwordErrorMessage } } },
        },
      });
      render(<LoginForm />);
      expect(screen.getByText(passwordErrorMessage)).toBeInTheDocument();
    });
  });

  describe('Form Submission and State', () => {
    it('shows loading state when isLoading is true', () => {
      mockUseLoginForm.mockReturnValueOnce({
        ...defaultMockUseLoginFormReturnValue,
        isLoading: true,
      });
      render(<LoginForm />);
      const loginButton = screen.getByRole('button', { name: 'ログイン中...' });
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toBeDisabled();
      expect(screen.getByLabelText('メールアドレス')).toBeDisabled();
      expect(screen.getByLabelText('パスワード')).toBeDisabled();
    });

    it('displays server error message', () => {
      const serverErrorMessage = 'サーバーエラーが発生しました。';
      mockUseLoginForm.mockReturnValueOnce({
        ...defaultMockUseLoginFormReturnValue,
        error: serverErrorMessage,
      });
      render(<LoginForm />);
      expect(screen.getByText(serverErrorMessage)).toBeInTheDocument();
    });

    it('calls handleLogin and redirects on successful login', async () => {
      const specificMockHandleLogin = vi.fn().mockResolvedValueOnce({ success: true });
      const specificMockHandleSubmit = vi.fn((dataHandler) => (e?: React.BaseSyntheticEvent) => {
        e?.preventDefault();
        return dataHandler({ email: 'testuser@example.com', password: 'password123' });
      });

      mockUseLoginForm.mockReturnValueOnce({
        ...defaultMockUseLoginFormReturnValue,
        handleLogin: specificMockHandleLogin,
        form: {
          ...defaultMockFormObject,
          handleSubmit: specificMockHandleSubmit,
        },
      });

      render(<LoginForm />);
      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      fireEvent.change(screen.getByLabelText('メールアドレス'), { target: { value: 'testuser@example.com' } });
      fireEvent.change(screen.getByLabelText('パスワード'), { target: { value: 'password123' } });
      fireEvent.click(loginButton);

      await waitFor(() => expect(specificMockHandleLogin).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(specificMockHandleLogin).toHaveBeenCalledWith({ email: 'testuser@example.com', password: 'password123' }));
      await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/dashboard'));
    });

    it('calls handleLogin and does not redirect on failed login', async () => {
      const specificMockHandleLogin = vi.fn().mockResolvedValueOnce({ success: false, error: 'Invalid credentials' });
      const specificMockHandleSubmit = vi.fn((dataHandler) => (e?: React.BaseSyntheticEvent) => {
        e?.preventDefault();
        return dataHandler({ email: 'testuser@example.com', password: 'wrongpassword' });
      });
      
      mockUseLoginForm.mockReturnValueOnce({
        ...defaultMockUseLoginFormReturnValue,
        handleLogin: specificMockHandleLogin,
        form: {
          ...defaultMockFormObject,
          handleSubmit: specificMockHandleSubmit,
        },
      });

      render(<LoginForm />);
      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      fireEvent.change(screen.getByLabelText('メールアドレス'), { target: { value: 'testuser@example.com' } });
      fireEvent.change(screen.getByLabelText('パスワード'), { target: { value: 'wrongpassword' } });
      fireEvent.click(loginButton);

      await waitFor(() => expect(specificMockHandleLogin).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(specificMockHandleLogin).toHaveBeenCalledWith({ email: 'testuser@example.com', password: 'wrongpassword' }));
      await waitFor(() => expect(mockPush).not.toHaveBeenCalled());
    });
  });

  describe('Redirection if Authenticated', () => {
    it('redirects to /dashboard if already authenticated', () => {
      mockUseAuth.mockReturnValueOnce({
        isAuthenticated: true,
        isAuthLoading: false,
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
        login: vi.fn(),
        logout: vi.fn(),
        signup: vi.fn(),
      });
      render(<LoginForm />);
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  describe('Error Reset on Input Change', () => {
    // Test the effect of form.watch -> resetError
    // The component's useEffect calls form.watch, and the callback from watch calls resetError.
    // We need to ensure our mock for form.watch correctly captures and can invoke the callback.
    it('calls resetError when form.watch callback is invoked (simulating input change)', async () => {
      const mockResetErrorFn = vi.fn();
      let watchCallback: () => void = () => {}; // To store the callback passed to watch

      const mockWatchFn = vi.fn((cb: () => void) => {
        watchCallback = cb; // Capture the callback
        return { unsubscribe: vi.fn() };
      });

      mockUseLoginForm.mockReturnValueOnce({
        ...defaultMockUseLoginFormReturnValue,
        resetError: mockResetErrorFn, // This is the function we expect to be called
        form: {
          ...defaultMockFormObject,
          watch: mockWatchFn, // Our watch mock that captures the callback
        },
      });
      
      render(<LoginForm />);
      
      // Ensure watch was called (by useEffect in component)
      expect(mockWatchFn).toHaveBeenCalled();

      // Now, simulate the captured callback being invoked, as if an input changed
      // and react-hook-form's watch mechanism triggered it.
      if (watchCallback) {
        watchCallback();
      }
      
      await waitFor(() => expect(mockResetErrorFn).toHaveBeenCalledTimes(1));
    });
  });
});
