import axios from 'axios';
import { fallbackPortfolioData } from '../data/fallbackPortfolio';

// In Vite, environment variables must be prefixed with VITE_
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create configured Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Check backend health status
 */
export async function checkBackendHealth() {
  try {
    const response = await apiClient.get('/health');
    return {
      online: true,
      data: response.data,
      url: API_BASE_URL,
      error: null
    };
  } catch (err) {
    return {
      online: false,
      data: null,
      url: API_BASE_URL,
      error: err.message || 'Unable to connect to Express backend'
    };
  }
}

/**
 * Fetch portfolio data from backend with automatic graceful fallback
 */
export async function fetchPortfolioData() {
  try {
    const response = await apiClient.get('/portfolio');
    if (response.data && response.data.data) {
      return {
        data: response.data.data,
        isFallback: false,
        source: 'Live Express REST API',
        error: null
      };
    }
    throw new Error('Invalid response structure received from API');
  } catch (err) {
    console.warn('[API Service] Backend unavailable or failed. Loading cached portfolio data.', err.message);
    return {
      data: fallbackPortfolioData,
      isFallback: true,
      source: 'Local Cached State (Backend Standby)',
      error: err.message || 'Failed to connect to backend server'
    };
  }
}

/**
 * Fetch projects from backend with optional filters
 */
export async function fetchProjects(params = {}) {
  try {
    const response = await apiClient.get('/projects', { params });
    if (response.data && response.data.data) {
      return {
        data: response.data.data,
        isFallback: false,
        error: null
      };
    }
    throw new Error('Invalid project response from API');
  } catch (err) {
    console.warn('[API Service] Projects API unavailable. Using fallback projects.');
    return {
      data: fallbackPortfolioData.projects,
      isFallback: true,
      error: err.message
    };
  }
}

/**
 * Submit contact message directly to Web3Forms API
 * https://api.web3forms.com/submit
 */
export async function submitWeb3FormsContact(formData) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey || accessKey.trim() === '' || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
    throw new Error(
      'Web3Forms access key is not configured. Please set VITE_WEB3FORMS_ACCESS_KEY in your environment variables (e.g., in Vercel project settings).'
    );
  }

  const payload = {
    access_key: accessKey.trim(),
    name: formData.name.trim(),
    email: formData.email.trim(),
    subject: formData.subject?.trim() || `Portfolio Inquiry from ${formData.name.trim()}`,
    message: formData.message.trim(),
    botcheck: formData.botcheck ? 'bot_detected' : '',
    from_name: 'Varikuntla Nagamounika Portfolio',
  };

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to deliver message via Web3Forms.');
  }

  return data;
}

/**
 * Submit contact form payload to backend (optional local endpoint)
 */
export async function submitContactForm(payload) {
  try {
    const response = await apiClient.post('/contact', payload);
    return {
      success: true,
      status: response.status,
      data: response.data
    };
  } catch (err) {
    if (err.response && err.response.data) {
      return {
        success: false,
        status: err.response.status,
        data: err.response.data,
        message: err.response.data.message || 'Submission rejected by server'
      };
    }
    return {
      success: false,
      status: 0,
      data: null,
      message: 'Network error: could not connect to backend server to validate message.'
    };
  }
}

export { API_BASE_URL };

