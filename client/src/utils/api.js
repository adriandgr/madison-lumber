import axios from 'axios';
import querystring from 'querystring';


const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://db.madisonsreport.com'
  : 'http://localhost:8181';

var instance = axios.create({
  baseURL,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});


const api = {
  validateToken: (token) => {
    return instance.post(
      '/api/auth',
      querystring.stringify({ token })
      ).then(res => res.data);
  },
  authUser: (email, password) => {
    console.log('hey')
    return instance.post(
      '/api/auth',
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
  createMill: (token, mill) => {
    return instance.post(
      '/api/mills/create',
      querystring.stringify({
        token,
        ...mill
      })).then(res => res.data);
  },
  uploadCsv: (token, csv) =>{

  },
  deleteMill: (token, millSlug) => {
    return instance.get(`/api/mills/${millSlug}/delete?token=${token}`)
      .then(res => res.data );
  },
  getUsers: (token) => {
    return instance.get(`/api/users?token=${token}`)
      .then(res => res.data );
  },
  createUser: (token, user) => {
    return instance.post(
      '/api/users/create',
      querystring.stringify({
        token,
        firstName: user.name,
        lastName: user.surname,
        email: user.email,
        password: user.pwd,
        accountType: user.type
      })).then(res => res.data);
  }
}

export default api;

