const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const validationMessage = Array.isArray(data.errors)
      ? data.errors.map((error: { msg?: string }) => error.msg).filter(Boolean).join(' ')
      : '';
    throw new Error(data.message || validationMessage || `Request failed (${response.status}).`);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, headers?: Record<string, string>) => apiFetch<T>(path, { method: 'GET', headers }),
  post: <T>(path: string, body?: unknown, headers?: Record<string, string>) => apiFetch<T>(path, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
    headers,
  }),
  put: <T>(path: string, body?: unknown, headers?: Record<string, string>) => apiFetch<T>(path, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
    headers,
  }),
  delete: <T>(path: string, headers?: Record<string, string>) => apiFetch<T>(path, { method: 'DELETE', headers }),
};

export default api;
