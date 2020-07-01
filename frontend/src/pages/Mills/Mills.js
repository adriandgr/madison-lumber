import React, {useState, useContext, useEffect} from "react";
import {UserContext} from "../../contexts/userContext"
import PageHeader from "../../components/PageHeader";
import heroImg from "../../assets/mills-header.jpg";

import MillCards from "./MillCards"
import Pager from "../../components/Pager"

import {useHistory} from 'react-router-dom'


function Mills() {
  const {token} = useContext(UserContext)
  const [mills, setMills] = useState([])
  const [search, setSearch] = useState([])
  const history = useHistory()

  useEffect(() =>{
    if (token) {
      loadMills(token)
    }
  },[token])

  function handleChange(e) {
    const {name, value} = e.target
    if (name === 'search') {
      setSearch(value)
      history.push(`/mills?search=${value}`)
      history.
    }
  }

  function loadMills(token) {
    console.log('LOAD_MILL token', token)
    const requestBody = {
      query: `query {
        mills {
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

    fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Fetch Failed!")
        } 
        return res.json();
    }).then((resData) => {
        if (resData.data.mills) {
          setMills(resData.data.mills)
        } else {
          console.log('ELSE loadMills')
        }

    }).catch((err) => {
      console.log(err)
    });
  }

  return (
    <div>
      <PageHeader title="Mills" heroImg={heroImg} />
      <div className="container containter__mill_search">
        <form>
          <input
            value={search}
            name="search"
            onChange={handleChange}

          />
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
