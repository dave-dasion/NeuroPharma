import axios from 'axios';

class AxiosHelper {
  // Define the base URL (you can change this based on your backend API)
  static baseURL = 'https://dasion-guider.com/eldercare/';
  // Create an axios instance
  static axiosInstance = axios.create({
    baseURL: AxiosHelper.baseURL,
    timeout: 900000,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key':'eld_sk_8f4c9d2e7b6a5f3e1d9c8b7a6f4e3d2c1b0a9f8e'
      // 'x-api-key':'xBoq2s0jzAWnVrXEsgheaMjKRjiLuht5cZ9UfrV1'
    },
  });
 
 

  // Optional: Set up an interceptor for requests
  static setupRequestInterceptor() {
    AxiosHelper.axiosInstance.interceptors.request.use(
      (config) => {
        // Add any headers or token logic here, e.g., auth token
        const token = ''; // Get token from storage or state
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Optional: Set up an interceptor for responses
  static setupResponseInterceptor() {
    AxiosHelper.axiosInstance.interceptors.response.use(
      (response) => {
        return response.data; // You can return just the response data
      },
      (error) => {
        const status = error?.response?.status;
        if (status === 401) {
          // Handle unauthorized access (e.g., logout, redirect)
        }
        // You can handle different error codes or throw custom error
        return Promise.reject(error.response || error);
      }
    );
  }

  // GET request
  static get(url, params = {}) {
    return AxiosHelper.axiosInstance
      .get(url, { params })
      .then((response) => response)
      .catch((error) => {
        // console.error(error); // Optionally log errors
        throw error; // Rethrow error to handle it elsewhere
      });
  }

  // POST request
  static post(url, data = {}) {
    return AxiosHelper.axiosInstance
      .post(url, data)
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  // PUT request
  static put(url, data = {}) {
    return AxiosHelper.axiosInstance
      .put(url, data)
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  // DELETE request
  static delete(url) {
    return AxiosHelper.axiosInstance
      .delete(url)
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export default AxiosHelper;
