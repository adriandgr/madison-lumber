import React, {useState} from 'react'
import PageHeader from "../../components/PageHeader"
import Message from "../../components/Message"

import heroImg from "../../assets/moodyville-yard.jpg"
import LoginForm from "./LoginForm"

function Login() {
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div>
      <PageHeader title='Login' heroImg={heroImg} />
      <div className="container">
        {errorMessage &&
          <Message title="Oops... something went wrong!" setMessage={setErrorMessage}>
            {errorMessage}
          </Message>
        }
      
      <LoginForm setErrorMessage={setErrorMessage}/>
      
    

      </div>
      
    </div>
    
  )
}

export default Login