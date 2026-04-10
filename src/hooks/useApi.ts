import { useCallback } from 'react';
import type { AxiosResponse } from 'axios';
import api from '../services/api';
import { useSnackbar } from '../context/SnackbarContext';
import { useLoader } from '../context/LoaderContext';

export const useApi = () => {
  const { showSnackbar } = useSnackbar();
  const { showLoader, hideLoader } = useLoader();

  const request = useCallback(async <T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    showSuccessToast = false,
    showErrorToast = true
  ): Promise<T | null> => {
    showLoader();
    try {
      const response: AxiosResponse<T> = await (api as any)[method](url, data);
      if (showSuccessToast) {
        showSnackbar('Operation successful', 'success');
      }
      return response.data;
    } catch (error: any) {
      if (showErrorToast) {
        const message = error.response?.data?.message || 'Something went wrong';
        showSnackbar(message, 'error');
      }
      return null;
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader, showSnackbar]);

  return {
    get: <T>(url: string) => request<T>('get', url),
    post: <T>(url: string, data: any, showToast = true) => request<T>('post', url, data, showToast),
    put: <T>(url: string, data: any, showToast = true) => request<T>('put', url, data, showToast),
    del: <T>(url: string, showToast = true) => request<T>('delete', url, null, showToast),
  };
};
