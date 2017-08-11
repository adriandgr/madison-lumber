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
    return instance.post(
      '/api/auth',
      querystring.stringify({ email, password })
      ).then(res => res.data);
  },
  getMills: (token, q) => {
    return instance.get(`/api/mills?token=${token}&q=${q}`)
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
  getUser: (token, userUri) => {
    return instance.get(`/api${userUri}?token=${token}`)
      .then(res => {
        return res.data} );
  },
  deleteUser: (token, email, uuidUri) => {
    return instance.post(
      `/api${uuidUri}/delete`,
      querystring.stringify({
        token,
        email
      })).then(res => res.data);
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
        accountType: user.accountType
      })).then(res => res.data);
  }
}

export default api;

