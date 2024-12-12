import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ??
      (typeof error.response?.data === 'string'
        ? error.response.data
        : 'Something went wrong!')
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred.';
};
