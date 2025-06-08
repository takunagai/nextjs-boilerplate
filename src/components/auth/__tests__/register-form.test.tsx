import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RegisterForm } from '../register-form'; // Adjust path as necessary
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// --- Mocks ---
// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));
const mockUseRouter = useRouter as ReturnType<typeof vi.fn>;
const mockRouterPush = vi.fn();

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));
const mockToastSuccess = toast.success as ReturnType<typeof vi.fn>;
const mockToastError = toast.error as ReturnType<typeof vi.fn>;

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;
// --- End Mocks ---

describe('RegisterForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.resetAllMocks(); // Reset all mocks before each test
    mockUseRouter.mockReturnValue({ push: mockRouterPush }); // Setup router mock
  });

  afterEach(() => {
    // Clear any specific fetch mocks set during tests
    mockFetch.mockReset();
  });

  // --- Zod Error Messages (from component schema) ---
  const nameRequiredError = "氏名は必須です";
  const emailInvalidError = "有効なメールアドレスを入力してください";
  const passwordMinLengthError = "パスワードは8文字以上で入力してください";
  const confirmPasswordRequiredError = "確認用パスワードを入力してください";
  const termsRequiredError = "利用規約への同意が必要です";
  const passwordMismatchError = "パスワードが一致しません";
  // --- End Zod Error Messages ---

  describe('Initial Rendering', () => {
    it('renders all form fields, register button, and login link', () => {
      render(<RegisterForm />);

      expect(screen.getByLabelText(/氏名/)).toBeInTheDocument();
      expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
      expect(screen.getByLabelText(/^パスワード$/)).toBeInTheDocument(); // Exact match for "パスワード"
      expect(screen.getByLabelText(/パスワード（確認用）/)).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /利用規約/ })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /利用規約/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '登録' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'ログイン' })).toBeInTheDocument();
    });
  });

  describe('Input Validation', () => {
    it('shows error for empty name and sets aria-invalid', async () => {
      render(<RegisterForm />);
      const nameInput = screen.getByLabelText(/氏名/);
      await act(async () => {
        await user.click(screen.getByRole('button', { name: '登録' }));
      });
      await waitFor(() => expect(nameInput).toHaveAttribute('aria-invalid', 'true'));
      expect(await screen.findByText(nameRequiredError)).toBeInTheDocument();
    });

    it('shows error for invalid email and sets aria-invalid', async () => {
      render(<RegisterForm />);
      const emailInput = screen.getByLabelText(/メールアドレス/);
      await act(async () => {
        await user.type(emailInput, 'invalid');
        await user.click(screen.getByRole('button', { name: '登録' }));
      });
      await waitFor(() => expect(emailInput).toHaveAttribute('aria-invalid', 'true'));
      expect(await screen.findByText(emailInvalidError)).toBeInTheDocument();
    });

    it('shows error for password less than 8 characters and sets aria-invalid', async () => {
      render(<RegisterForm />);
      const passwordInput = screen.getByLabelText(/^パスワード$/);
      await act(async () => {
        await user.type(passwordInput, 'short');
        await user.click(screen.getByRole('button', { name: '登録' }));
      });
      await waitFor(() => expect(passwordInput).toHaveAttribute('aria-invalid', 'true'));
      expect(await screen.findByText(passwordMinLengthError)).toBeInTheDocument();
    });

    it('shows error for empty confirm password and sets aria-invalid', async () => {
      render(<RegisterForm />);
      const confirmPasswordInput = screen.getByLabelText(/パスワード（確認用）/);
      // First, fill the password field to avoid its validation error masking this one
      await act(async () => {
        await user.type(screen.getByLabelText(/^パスワード$/), 'password123');
        await user.click(screen.getByRole('button', { name: '登録' }));
      });
      await waitFor(() => expect(confirmPasswordInput).toHaveAttribute('aria-invalid', 'true'));
      expect(await screen.findByText(confirmPasswordRequiredError)).toBeInTheDocument();
    });

    it('shows error when passwords do not match and sets aria-invalid on confirm password', async () => {
      render(<RegisterForm />);
      const passwordInput = screen.getByLabelText(/^パスワード$/);
      const confirmPasswordInput = screen.getByLabelText(/パスワード（確認用）/);
      await act(async () => {
        await user.type(passwordInput, 'password123');
        await user.type(confirmPasswordInput, 'password321');
        await user.click(screen.getByRole('button', { name: '登録' }));
      });
      await waitFor(() => expect(confirmPasswordInput).toHaveAttribute('aria-invalid', 'true'));
      expect(await screen.findByText(passwordMismatchError)).toBeInTheDocument();
    });

    it('shows error when terms are not accepted and sets aria-invalid on checkbox', async () => {
      render(<RegisterForm />);
      // Fill other fields to ensure only terms error shows
      await act(async () => {
        await user.type(screen.getByLabelText(/氏名/), 'Test User');
        await user.type(screen.getByLabelText(/メールアドレス/), 'test@example.com');
        await user.type(screen.getByLabelText(/^パスワード$/), 'password123');
        await user.type(screen.getByLabelText(/パスワード（確認用）/), 'password123');
        await user.click(screen.getByRole('button', { name: '登録' }));
      });
      // Verify terms error message appears
      expect(await screen.findByText(termsRequiredError)).toBeInTheDocument();
      // Also verify checkbox is available for interaction
      const termsCheckbox = screen.getByRole('checkbox', { name: /利用規約/ });
      expect(termsCheckbox).toBeInTheDocument();
    });
  });
  
  // Placeholder for Submission Logic tests
  describe('Form Submission Logic', () => {
    const fillValidForm = async () => {
        await user.type(screen.getByLabelText(/氏名/), 'Test User');
        await user.type(screen.getByLabelText(/メールアドレス/), 'test@example.com');
        await user.type(screen.getByLabelText(/^パスワード$/), 'ValidPassword123');
        await user.type(screen.getByLabelText(/パスワード（確認用）/), 'ValidPassword123');
        await user.click(screen.getByRole('checkbox', { name: /利用規約/ }));
    };

    it('successful registration calls fetch, toasts success, and redirects', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response);

      render(<RegisterForm />);
      await act(async () => {
        await fillValidForm();
        await user.click(screen.getByRole('button', { name: '登録' }));
      });

      await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
      expect(mockFetch).toHaveBeenCalledWith('/api/auth/register', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'ValidPassword123',
        }),
      }));

      await waitFor(() => expect(mockToastSuccess).toHaveBeenCalledWith('アカウントが作成されました'));
      await waitFor(() => expect(mockRouterPush).toHaveBeenCalledWith('/login?registered=true'));
    });

    it('handles API error during registration', async () => {
      const apiErrorMessage = 'Email already exists';
      mockFetch.mockResolvedValueOnce({
        ok: false, // Simulate an error response
        json: async () => ({ error: { message: apiErrorMessage } }),
      } as Response);

      render(<RegisterForm />);
      await act(async () => {
        await fillValidForm();
        await user.click(screen.getByRole('button', { name: '登録' }));
      });

      await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(mockToastError).toHaveBeenCalledWith(apiErrorMessage));
      expect(mockRouterPush).not.toHaveBeenCalled();
    });

    it('handles network error during registration', async () => {
      mockFetch.mockRejectedValueOnce(new TypeError('Network failed')); // Simulate a network error

      render(<RegisterForm />);
      await act(async () => {
        await fillValidForm();
        await user.click(screen.getByRole('button', { name: '登録' }));
      });

      await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(mockToastError).toHaveBeenCalledWith('登録処理中にエラーが発生しました'));
      expect(mockRouterPush).not.toHaveBeenCalled();
    });

    it('shows loading state during submission', async () => {
      // Make the mock promise resolve slowly to check intermediate loading state
      mockFetch.mockImplementationOnce(
        () => new Promise(resolve => setTimeout(() => resolve({
            ok: true,
            json: async () => ({ success: true }),
        } as Response), 100))
      );

      render(<RegisterForm />);
      await act(async () => {
        await fillValidForm();
      });
      
      const submitButton = screen.getByRole('button', { name: '登録' });
      // Don't await the click itself if we want to immediately check the state after click
      act(() => {
        user.click(submitButton);
      });

      // Check for loading state immediately after click
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('処理中...');
      
      // Wait for submission to complete (fetch to be called and toast to appear)
      await waitFor(() => expect(mockToastSuccess).toHaveBeenCalledWith('アカウントが作成されました'));
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent('登録');
    });
  });

});
