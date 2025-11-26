/**
 * Centralized error handling utilities for API calls
 */

/**
 * Handle API errors consistently across the application
 * 
 * @param error - The error object from the API call
 * @param logout - Optional logout function to call on 401 errors
 * @returns User-friendly error message
 * 
 * @example
 * ```typescript
 * try {
 *   await someApi.call();
 * } catch (error: any) {
 *   const message = handleApiError(error, handleLogout);
 *   setError(message);
 * }
 * ```
 */
export function handleApiError(
  error: any,
  logout?: () => Promise<void> | void
): string {
  console.error('[API Error]', error);

  // Handle 401 Unauthorized - trigger logout
  if (error.status === 401 && logout) {
    console.log('[Error Handler] 401 detected, triggering logout...');
    logout();
    return 'Session expired. Please log in again.';
  }

  // Handle 403 Forbidden
  if (error.status === 403) {
    return 'You do not have permission to perform this action.';
  }

  // Handle 404 Not Found
  if (error.status === 404) {
    return 'The requested resource was not found.';
  }

  // Handle 422 Validation Error (has its own handler)
  if (error.status === 422) {
    return 'Please fix the validation errors and try again.';
  }

  // Handle 500 Server Error
  if (error.status >= 500) {
    return 'Server error. Please try again later.';
  }

  // Handle network errors
  if (error.message === 'Network Error' || error.message === 'Failed to fetch') {
    return 'Network error. Please check your connection and try again.';
  }

  // Return custom error message or generic fallback
  return error.message || 'An unexpected error occurred. Please try again.';
}

/**
 * Extract validation errors from Laravel API responses
 * 
 * @param error - The error object from the API call
 * @returns Object with field names as keys and error messages as values
 * 
 * @example
 * ```typescript
 * try {
 *   await someApi.call();
 * } catch (error: any) {
 *   const validationErrors = getValidationErrors(error);
 *   setErrors(validationErrors);
 * }
 * ```
 */
export function getValidationErrors(error: any): Record<string, string[]> {
  if (error.status === 422 && error.validationErrors) {
    return error.validationErrors;
  }
  return {};
}

/**
 * Format validation errors for display
 * 
 * @param errors - Validation errors object
 * @returns Formatted error messages as string array
 */
export function formatValidationErrors(errors: Record<string, string[]>): string[] {
  return Object.entries(errors).flatMap(([field, messages]) =>
    messages.map(message => `${field}: ${message}`)
  );
}

/**
 * Async error handler wrapper for try-catch blocks
 * Automatically handles common error scenarios
 * 
 * @example
 * ```typescript
 * await withErrorHandling(
 *   async () => {
 *     const data = await someApi.call();
 *     setData(data);
 *   },
 *   {
 *     onError: (message) => setError(message),
 *     logout: handleLogout,
 *   }
 * );
 * ```
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  options?: {
    onError?: (message: string) => void;
    logout?: () => Promise<void> | void;
    onFinally?: () => void;
  }
): Promise<T | null> {
  try {
    return await fn();
  } catch (error: any) {
    const message = handleApiError(error, options?.logout);
    options?.onError?.(message);
    return null;
  } finally {
    options?.onFinally?.();
  }
}
