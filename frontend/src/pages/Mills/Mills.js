import React, {useState, useContext, useEffect} from "react";
import {UserContext} from "../../contexts/userContext"
import PageHeader from "../../components/PageHeader";
import heroImg from "../../assets/mills-header.jpg";
import queryString from "query-string"
import gql from "../../gql/requests"

import MillCards from "./MillCards"
import Pager from "../../components/Pager"

import {useHistory} from 'react-router-dom'


function Mills() {
  const {token, logout} = useContext(UserContext)
  const [mills, setMills] = useState([])
  const [search, setSearch] = useState([])
  const history = useHistory()

  useEffect(() =>{
    const {search} = history.location
    const filters = queryString.parse(search)
    if (token) {
      loadMills(token, filters)
    } else {
      // history.push('/login')
    }
  },[token])

  function handleChange(e) {
    const {name, value} = e.target
    if (name === 'search') {
      setSearch(value)
      
      history.push(`/mills?q=${value}`)
      // history.
    }
  }
 

  function loadMills(token, filters) {
    const {q} = filters
    const requestBody = {
      query: `query {
        mills(resultFilters: { query:"${q ? q : ""}"}) {
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
        setMills(res.data.data.mills)
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

  return (
    <div>
      <PageHeader title="Mills" heroImg={heroImg} />
      <div className="container container__mill_search">
        <form>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                value={search}
                name="search"
                type="text"
                placeholder="search"
                onChange={handleChange}
                className="input"
            />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
              {/* {emailIsBlank && <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
              </span>} */}
            </p>
            
          </div>

        
          
        </form>
      </div>

      <div className="container containter__result_count">
        <div><strong>{mills.length} mills</strong></div>
      </div>
      
      {(mills.length > 0)  &&
        <>
          <MillCards mills={mills} columns={4}/>
          <Pager currentPage={1} pageCount={132}/>
        </>
      }
      
    </div>
  );
}

export default Mills;
