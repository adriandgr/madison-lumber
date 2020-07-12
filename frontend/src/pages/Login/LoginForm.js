import React, {useState,useContext} from 'react'
import { UserContext } from "../../contexts/userContext";

function LoginForm(props) {
  const [email, setEmail] = useState('')
  const [emailIsBlank, setEmailIsBlank] = useState(false)
  const [password, setPassword] = useState('')
  const [pwIsBlank, setPwIsBlank] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const {login} = useContext(UserContext)

  function handleChange(e) {
    const {type, value} = e.target
    if (type === 'email') {
      setEmailIsBlank(false)
      setEmail(value)
    } else if (type === 'password') {
      setPwIsBlank(false)
      setPassword(value)
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    props.setErrorMessage('')
    if (email === '') {
      setEmailIsBlank(true)
    } 
    if (password === '') {
      setPwIsBlank(true)
    } 
    let requestBody = {
        query: `
            query {
                login(email: "${email}", password: "${password}") {
                  token
                  firstName
                  isAdmin
                  accountType 
                }
            }
        `
    };
    if ((email !== '') && (password !== '')) {
      setIsFetching(true)
      fetch("http://localhost:8181/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Fetch Failed!");
          }
          return res.json();
      }).then((resData) => {
          if (resData.data.login.token) {
            const userDetails = {
              ...resData.data.login
            }
            setIsFetching(false)
            login(userDetails, '/mills')
          }
      }).catch((err) => {
          setTimeout(() => setIsFetching(false), 800);

          if (err.message === 'Fetch Failed!') {
            const err_msg = 'Provided email and password do not match.'
            setTimeout(() => props.setErrorMessage(err_msg), 1100);
          } else {
            props.setErrorMessage('We encountered an unexpected error while handling your request. Please try again later.')
            console.log('Fetch Login', err);
          }
      
          
      });
    }
  }
  return (
    <div className="container container__login-form">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input 
              value={email}
              onChange={handleChange}
              type="email"
              className={emailIsBlank ? "input is-danger" : "input"}
              placeholder="Email" 
            />
            <span className="icon is-small is-left">
              <i className="ri-mail-fill"></i>
            </span>
            {emailIsBlank && <span class="icon is-small is-right">
              <i class="ri-error-warning-fill"></i>
            </span>}
          </p>
          {emailIsBlank && <p class="help is-danger">Email may not be blank</p>}
        </div>

        <div className="field">
          <div className={`control has-icons-left${pwIsBlank ? ' has-icons-right':''}`}>
            <input 
              value={password}
              onChange={handleChange}
              className={pwIsBlank ? "input is-danger" : "input"}
              type="password" 
              placeholder="Password" />
            <span className="icon is-small is-left">
              <i className="ri-lock-fill"></i>
            </span>
            {pwIsBlank && <span class="icon is-small is-right">
              <i class="ri-error-warning-fill"></i>
            </span>}
          </div>
          {pwIsBlank && <p class="help is-danger">Password may not be blank</p>}
        </div>


        <div className="field">
          <p className="control">
            <button className="button is-success button__login">
            { !isFetching ?
            <>Login</> :
            <span className="icon is-small is-left">
              <i className="ri-refresh-line ri-icon-spin"></i>
            </span>}
            </button>
          </p>
        </div>
      </form>
    </div>
    
  )
}

export default LoginForm