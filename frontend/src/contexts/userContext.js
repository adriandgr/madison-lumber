import React, {useState} from "react";
const UserContext = React.createContext();

function UserContextProvider(props) {
  const [token, setToken] = useState()
  const [userDetails, setUserDetails] = useState()

  const login = (token, userDetails) => {
    setToken(token)
    setUserDetails(userDetails)
  }
  const logout = () => {
    setToken()
    setUserDetails()
  }
  return (
    <UserContext.Provider value={{token, userDetails, login, logout}} >
      { props.children }
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext };