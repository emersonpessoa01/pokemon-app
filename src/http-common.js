import axios from 'axios';

export default axios.create({
  // baseURL: 'https://localhost:8081.com/',
  baseURL: 'https://back-pokemon-api.herokuapp.com/pokemon/',
  headers: {
    'Content-type': 'application/json',
  },
});

