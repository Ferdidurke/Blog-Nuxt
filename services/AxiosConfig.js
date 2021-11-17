import axios from 'axios';

const blogAPI = url =>
  axios.create({
    baseURL: url,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

  });




export default blogAPI;
