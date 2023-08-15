// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // แก้ไข URL ของ API ตามที่คุณใช้งานจริง
});

export default api;
