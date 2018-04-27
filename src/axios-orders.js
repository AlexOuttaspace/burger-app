import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-app-83f4e.firebaseio.com/'
});

export default instance;