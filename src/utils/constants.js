// API is called directly; the API server must allow the frontend origin via CORS.
export const API_ROOT = import.meta.env.VITE_API_ROOT || 'http://192.168.1.6:8017'
