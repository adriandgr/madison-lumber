import axios from 'axios';
import querystring from 'qs';

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://db.madisonsreport.com'
  : 'http://localhost:8181';

var instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});


const api = {
  authUser: (email, password) => {
    return instance.post(
      '/api/login',
      querystring.stringify({ email, password })
      ).then(res => res.data);
  },
  validateToken: token => {
      const authHeader = { headers: { Authorization: 'Bearer ' + token } };
      return instance.post('/api/validate', null, authHeader)
          .then(res => res.data);
  },
  getMills: (token, q) => {
    let authHeader = { headers: { Authorization: 'Bearer ' + token } }
    let query = `/api/mills/?`;
    if(q) {
      const parsed = querystring.parse(q.slice(1));
      parsed.q ? parsed.q = parsed.q : parsed.q = '';
      parsed.r ? parsed.r = parsed.r : parsed.r = '';
      parsed.t ? parsed.t = parsed.t : parsed.t = '';
      parsed.pr ? parsed.pr = parsed.pr : parsed.pr = '';
      parsed.sp ? parsed.sp = parsed.sp : parsed.sp = '';
      query += `q=${parsed.q}&r=${parsed.r}&t=${parsed.t}&pr=${parsed.pr}&sp=${parsed.sp}&p=${parsed.p}&limit=${parsed.limit}`;
    } else {
      query += `q=&p=1&limit=20`;
    }
    return instance.get(query,authHeader)
        .then(res => res.data );
  },
  getMill: (token, millUUID) => {
    console.log("Attempted to fetch mill with _id: " + millUUID);
    return instance.get(`/api${millUUID}?token=${token}`)
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
  editMill: (token, slug, options, sectionName) => {
    return instance.post(
      '/api/mills/processEdit',
      querystring.stringify({
        token,
        slug: slug,
        options: options,
        sectionName: sectionName
      })
    ).then(res => res.data);
  },
  uploadCsv: (token, csv) => {

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
  },
  registerUser: (invitationCode, user) => {
    return instance.post(
      '/api/users/register',
      querystring.stringify({
        invitationCode,
        firstName: user.name,
        lastName: user.surname,
        email: user.email,
        password: user.pwd,
        accountType: user.accountType
      })).then(res => res.data);
  }
}

export default api;

