import React, {useEffect, useState, useContext} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import heroImg from "../../assets/kiln-dried-lumber.jpg"
import PageHeader from "../../components/PageHeader"
import gql from "../../gql/requests"

import {UserContext} from "../../contexts/userContext"

function Mill() {
  const {mill_uuid} = useParams()
  const history = useHistory()
  const [mill, setMill] = useState({})
  const {token, logout} = useContext(UserContext)

  useEffect(()=>{
    if (token) {
      loadMill(mill_uuid, token)
    }
  },[])

  function loadMill(mill_id, token) {
    const requestBody = {
      query: `query {
        mills(resultFilters: { uuid:"${mill_id}"}) {
          uuid
          name
          type
          region
          qualifications {
            millStatus
          }
          lastUpdated
        }
      }`
    }
    gql.query(requestBody, token).then(res => {
      if (res.data.data.mills) {
        setMill(res.data.data.mills[0])
      } else {
        console.log("ERROR gql mills")
      }
    }).catch(err => {
      // ["config", "request", "response", "isAxiosError", "toJSON"]
      if (err.response.data.errors[0].message === 'Unauthenticated') {
        console.log("Redirect")
        logout()
        history.push("/login", {token: "Expired"})
      }   
    })
  }
  return(
    <>
      <PageHeader title={mill.name} heroImg={heroImg} />
      {JSON.stringify(mill)}
    </>
  )

}

export default Mill