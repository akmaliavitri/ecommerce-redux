import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { access_token: localStorage.getItem("access_token") }
});

export default axiosInstance