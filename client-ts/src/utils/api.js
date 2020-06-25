import axios from 'axios';
import querystring from 'qs';

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://db.madisonsreport.com'
  : 'http://localhost:8181';

var instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
});


const api = {
  authUser: (email, password) => {
    return instance.post(
        '/graphql',
        { query:`
            query {
                login(email: "${email}", password: "${password}") {
                    userId
                    firstName
                    token
                    isAdmin
                    accountType
                }
            }
          ` }
    ).then(res => res.data);
  },
  validateToken: token => {
      // const authHeader = { headers: { Authorization: 'Bearer ' + token } };
      return instance.post(
          '/graphql',
          { query:`
          query {
            validate(token: "${token}") {
                userId
                firstName
                token
                isAdmin
                accountType
            }
          }
          `}).then(res => res.data);
  },
  getMills: (token, q) => {
    // let query = `/api/mills/?token=${token}&`;
    let authHeader = { headers: { Authorization: 'Bearer ' + token } }
    let query = `/api/mills/?`;
    if(q) {
      const parsed = querystring.parse(q.slice(1));
      parsed.q ? parsed.q = parsed.q : parsed.q = '';
      query += `q=${parsed.q}&p=${parsed.p}&limit=${parsed.limit}`;
    } else {
      query += `q=&p=1&limit=20`;
    }
    return instance.post('/graphql',
        { query:`
            query {
                mills {
                    _id
                    uuid
                    name
                    type
                    region
                    qualifications {  millStatus }
                    lastUpdated
                }
            }
          ` }, authHeader)
        .then(res => res.data );
  },
  getMill: (token, millUUID) => {
     const mill = `
            query {
                mills {
                    _id
                    uuid
                    name
                    type
                    region
                    contact {
                        address
                        location
                        phone
                        fax
                        website
                        email
                        contactPersons
                    }
                    catalog: {
                        products
                        species
                        roughSizes
                        surfacedSizes
                        production
                        panelThickness
                        services
                        kilnCapacity
                        shipping
                        export
                    }
                    qualifications: {
                        gradingAgency
                        memberOf
                        employees
                        notes
                        certification
                        preservatives
                        treatingFacilities
                        distributionYard
                        millStatus
                    }
                    lastUpdated: String
                }
            }
          `
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
  }
}

export default api;

