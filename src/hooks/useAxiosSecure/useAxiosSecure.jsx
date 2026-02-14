import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://local-chef-bazaar-server-three.vercel.app',
    // baseURL: 'http://localhost:3000',
     withCredentials: true
});
const useAxiosSecure = () => {
    return instance;
};

export default useAxiosSecure;