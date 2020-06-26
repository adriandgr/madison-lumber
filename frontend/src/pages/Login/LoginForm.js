import React, {useState,useContext} from 'react'
import { UserContext } from "../../contexts/userContext";

function LoginForm() {
  const [email, setEmail] = useState('')
  const [emailIsBlank, setEmailIsBlank] = useState(false)
  const [password, setPassword] = useState('')
  const [pwIsBlank, setPwIsBlank] = useState(false)
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
    fetch("http://localhost:8181/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Fetch Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        if (resData.data.login.token) {
          const userDetails = {
            firstName: resData.data.login.firstName,
            isAdmin: resData.data.login.userId,
            accountType: resData.data.accountType
          }
          login(resData.data.login.token, userDetails)
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(email, password)

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
              <i className="fas fa-envelope"></i>
            </span>
            {emailIsBlank && <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle"></i>
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
              <i className="fas fa-lock"></i>
            </span>
            {pwIsBlank && <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle"></i>
            </span>}
          </div>
          {pwIsBlank && <p class="help is-danger">Password may not be blank</p>}
        </div>


        <div className="field">
          <p className="control">
            <button className="button is-success">
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
    
  )
}

export default LoginForm