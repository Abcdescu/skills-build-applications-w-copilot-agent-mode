/**
 * API utility for OctoFit Tracker
 * 
 * Uses VITE_CODESPACE_NAME for Codespaces environment, falls back to localhost:8000 if unset.
 * 
 * To use Codespaces, define VITE_CODESPACE_NAME in .env.local:
 *   VITE_CODESPACE_NAME=your-codespace-name
 */

export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  } else {
    // Fallback to localhost for local development
    return 'http://localhost:8000';
  }
};

export const apiGet = async (endpoint) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

export const apiPost = async (endpoint, data) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error posting to ${url}:`, error);
    throw error;
  }
};

/**
 * Helper to handle both paginated and array responses
 * API may return { users: [...] } or { items: [...] } or just [...]
 */
export const extractDataFromResponse = (response, key) => {
  if (Array.isArray(response)) {
    return response;
  }
  
  if (response[key]) {
    return response[key];
  }
  
  // Try common keys
  const commonKeys = ['data', 'items', 'results', 'records'];
  for (const k of commonKeys) {
    if (response[k]) {
      return response[k];
    }
  }
  
  return [];
};
