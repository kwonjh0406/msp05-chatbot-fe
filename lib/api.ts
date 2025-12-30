import axios from 'axios';

// Axios 인스턴스: API 요청을 위한 기본 설정을 정의합니다.
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
