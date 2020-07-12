import React, {useState} from "react"
import Cookies from 'universal-cookie'
import {useHistory} from 'react-router-dom'

const UserContext = React.createContext()

function UserContextProvider(props) {
  const [token, setToken] = useState(undefined)
  const [firstName, setFirstName] = useState('')
  const [accountType, setAccountType] = useState(null)
  const [isAdmin, setIsAdmin] = useState(null)
  const history = useHistory()

  const validateToken = (token) => {
    console.log('START VALIDATE TOKEN')
    const requestBody = {
      query: `query {
        validate(token: "${token}") {
          firstName
          accountType
          isAdmin
        }
      }`
    }

    fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Fetch Failed!")
        } 
        return res.json();
    }).then((resData) => {
        if (resData.data.validate.firstName) {
          const userDetails = {
            ...resData.data.validate,
            token
          }
          login(userDetails)
        } else {
          logout()
        }

    }).catch((err) => {
      logout()
      console.log(err)
    });
  }
  
  const login = (userDetails, redirectTo) => {
    console.log('LOGIN METHOD', userDetails)
    const {
      token, 
      firstName,
      accountType,
      isAdmin
    } = userDetails
    const cookies = new Cookies();
    cookies.set('jwt', token, { path: '/', maxAge: 86400 })
    setToken(token)
    setFirstName(firstName)
    setAccountType(accountType)
    setIsAdmin(isAdmin)

    if (redirectTo) {
      history.push(redirectTo)
    }
  }
  const logout = (redirectTo = "/") => {
    const cookies = new Cookies();
    cookies.remove('jwt', { path: '/' })
    setToken(null)
    setFirstName('')
    setAccountType(null)
    setIsAdmin(null)
    history.push(redirectTo)
  }
 
  return (
    <UserContext.Provider 
      value={{
        token,
        firstName,
        accountType,
        isAdmin,
        login,
        logout,
        validateToken
      }} 
    >
      { props.children }
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext }