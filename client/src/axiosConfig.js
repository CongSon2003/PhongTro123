import axios from 'axios';
const instance = axios.create({
  baseURL : process.env.REACT_APP_SERVER
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent :
    let token = window.localStorage.getItem('persist:AuthReducer') && JSON.parse(window.localStorage.getItem('persist:AuthReducer'))?.token.replace(/"/g,'')
    config.headers = {
      Authorization : token 
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data: => refresh token
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
export default instance