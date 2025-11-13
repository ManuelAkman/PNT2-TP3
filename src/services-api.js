import axios from 'axios'

export const MOCKAPI_BASE = 'https://691661e1a7a34288a27d32c7.mockapi.io/api/tp3'

const api = axios.create({
  baseURL: MOCKAPI_BASE,
  timeout: 10000
})

export default api
