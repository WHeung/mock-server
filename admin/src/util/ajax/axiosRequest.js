import Axios from 'axios'

const axiosRequest = Axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 2 * 60 * 1000,
  baseURL: window.location.origin
})

export default axiosRequest
