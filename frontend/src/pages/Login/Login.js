import React from 'react'
import PageHeader from "../../components/PageHeader"
import heroImg from "../../assets/moodyville-yard.jpg"
import LoginForm from "./LoginForm"

function Login() {
  
  return (
    <div>
      <PageHeader title='Login' heroImg={heroImg} />
      <LoginForm/>
    </div>
    
  )
}

export default Login