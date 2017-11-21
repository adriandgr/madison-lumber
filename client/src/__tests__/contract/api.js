import axios from 'axios';
import querystring from 'qs';

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://db.madisonsreport.com'
  : 'http://wtfismyip.com';

var instance = axios.create({
  baseURL,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

it('does something', () => {
  instance.get(`/text`)
    .then(res => {
      console.log(res.data)
      expect(tree).toBeNull();
    });
});