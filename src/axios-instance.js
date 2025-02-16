import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://execute-ab745.firebaseio.com/'
});

export default instance;