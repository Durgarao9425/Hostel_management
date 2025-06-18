import { useState, useCallback } from 'react';
import { ToastType } from '../components/ui/Toast';

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback((toast: Omit<ToastType, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message: string) => {
    addToast({ type: 'success', message });
  }, [addToast]);

  const error = useCallback((message: string) => {
    addToast({ type: 'error', message });
  }, [addToast]);

  const warning = useCallback((message: string) => {
    addToast({ type: 'warning', message });
  }, [addToast]);

  const info = useCallback((message: string) => {
    addToast({ type: 'info', message });
  }, [addToast]);

  return {
    toasts,
    removeToast,
    success,
    error,
    warning,
    info
  };
};