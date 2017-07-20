import axios from 'axios';
import querystring from 'querystring';


var instance = axios.create({
  baseURL: 'http://localhost:8181',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});


const api = {
  fetchToken: () => {
    var encodedURI = window.encodeURI('http://localhost:8181/');
    return axios.get(encodedURI)
      .then(res => res.data.validToken );
  },
  authUser: (email, password) => {
    console.log('hey')
    return instance.post(
      '/api/authTwo',
      querystring.stringify({ email, password })
      ).then(res => res.data);
  },
  getMills: (token) => {
    return instance.get(`/api/mills?token=${token}`)
      .then(res => res.data );
  },
  getMill: (token, millSlug) => {
    return instance.get(`/api${millSlug}?token=${token}`)
      .then(res => res.data );
  },
  getUsers: (token) => {
    return instance.get(`/api/users?token=${token}`)
      .then(res => res.data );
  }
}

export default api;

