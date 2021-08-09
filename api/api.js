import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.1.71:3000/posts',
     timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

export default api;