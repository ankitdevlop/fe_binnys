import axios from "axios";
import { API_ENDPOINTS, METHOD_TYPE } from "./apiUrls";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https://be-binnys.onrender.com/api/", // Your API base URL
    // baseURL: "http://localhost:4000/api/", // Your Local API base URL
  headers: {
    "Content-Type": "application/json",
    // Add any common headers here
  },
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  token && (config.headers.Authorization = "Bearer " + token);
  config.headers.platform = 'web';
  return config;
});

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// const shouldIntercept = (error) => {
//   try {
//     return error.response.status === 401
//   } catch (e) {
//     return false;
//   }
// };

// const expiredRefreshToken = (error, url) => {
//   try {
//       return error.response.status === 401 && API_ENDPOINTS.refreshToken === url
//   } catch (e) {
//       return false;
//   }
// };

const attachTokenToRequest = (request, token) => {
  if (request.url === "/engine/article-generator/") {
    request.headers['Content-Type'] = 'multipart/form-data';
  }
  request.headers['Authorization'] = 'Bearer ' + token;
};

// export const responseInterceptor = (navigate) => {
//   return api.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {

//       if (expiredRefreshToken(error, error.config.url)) {
//         console.log("Token expired.........");
//         toast.error('Session Expired');
//         delete error.config.headers.Authorization;
//         localStorage.clear();
//         navigate('/login')
//       }

//       if (!shouldIntercept(error)) {
//         return Promise.reject(error);
//       }

//       if (error.config._retry || error.config._queued) {
//         return Promise.reject(error);
//       }

//       const originalRequest = error.config;

//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject })
//         }).then(token => {
//           originalRequest._queued = true;
//           attachTokenToRequest(originalRequest, token);
//           return api.request(originalRequest);
//         }).catch(err => {
//           return Promise.reject(error); // Ignore refresh token request's "err" and return actual "error" for the original request
//         })
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       return new Promise((resolve, reject) => {
//         let data = {
//           method: METHOD_TYPE.post,
//           url: API_ENDPOINTS.refreshToken,
//           data: { "refreshToken": localStorage.getItem('refresh') }
//         };
//         api.request(data).then((data) => {
//           const { token, refresh } = data.data.data;
//           localStorage.setItem('token', token);
//           localStorage.setItem('refresh', refresh);
//           attachTokenToRequest(originalRequest, token);
//           processQueue(null, token);
//           resolve(api.request(originalRequest));
//         }).catch((err) => {
//           processQueue(err, "");
//           reject(err);
//         }).finally(() => {
//           isRefreshing = false;
//         })
//       });
//     }
//   );
// }


// // Optional: Add interceptors for authentication, error handling, etc.

export default api;