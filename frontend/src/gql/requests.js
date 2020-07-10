import axios from 'axios'


const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://db.madisonsreport.com/graphql'
  : 'http://localhost:8181/graphql';


const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
});

// fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
//   method: "POST",
//   body: JSON.stringify(requestBody),
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${token}`
//   },
// }).

export default {
  query: (query, token) => {
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    console.log("AXIOS")
    return instance.post('', query)
  }
}