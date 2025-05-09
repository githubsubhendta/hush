import axios from 'axios';
import {getTokenFromStorage} from './auth'; // Ensure this is implemented

const API_BASE_URL = 'https://hush-trending-service.onrender.com';
const API_BASE_URL_GLOBAL = 'https://hush-post-service.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});
const globalApi = axios.create({
  baseURL: API_BASE_URL_GLOBAL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

// api.interceptors.request.use(
//   async (config) => {
//     try {
//       const token = await getTokenFromStorage();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.error('Error retrieving token:', error);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('Unauthorized request - token may be invalid');
        // Add logic to redirect to login if needed
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message || 'Network Error');
  },
);
globalApi.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('Unauthorized request - token may be invalid');
        // Add logic to redirect to login if needed
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message || 'Network Error');
  },
);

export const TrendingPosts = {
  getTrendingPosts: params => api.get('/api/trending/posts', {params}),
};

export const GlobalPosts = {
  getGlobalPosts: params => globalApi.get('api/posts/global', {params}),
};

export const WatchPosts = {
  getWatchPosts: params => globalApi.get('/api/watch', {params}),
};

export const LocalPosts = {
  getLocalPosts: ({
    page,
    limit,
    latitude = 34.42985401,
    longitude = -118.5238887,
    range = 10,
  }) =>
    api.get('/api/local/posts', {
      params: {page, limit, latitude, longitude, range},
    }),
};
