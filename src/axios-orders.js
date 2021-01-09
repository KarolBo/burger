import axios from 'axios';

const myInstance = axios.create({
    baseURL: 'https://react-burger-karol-default-rtdb.firebaseio.com'
});

export default myInstance;