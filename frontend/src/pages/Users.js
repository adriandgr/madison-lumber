import React, {useState, useEffect, useContext, useCallback} from "react"
import {Redirect} from "react-router-dom"
import {UserContext} from "../contexts/userContext"

import PageHeader from "../components/PageHeader"
import Table from "../components/Table"
import heroImg from "../assets/moodyville-yard.jpg"

const dummy = [
  {_id: 'uno', firstName: "Johnny", lastName: "Cool", accountType: "free", isAdmin: false },
  {_id: 'dos', firstName: "Addy", lastName: "Nice", accountType: "paid", isAdmin: true },
  {_id: 'tres', firstName: "Mike", lastName: "Jackson", accountType: "developer", isAdmin: true },
  {_id: 'quatorce', firstName: "Steph", lastName: "Cho", accountType: "paid", isAdmin: false },
  {_id: 'quince', firstName: "Milly", lastName: "Miller", accountType: "free", isAdmin: false },
  {_id: 'mille', firstName: "Michelle", lastName: "Obama", accountType: "free", isAdmin: false },
]

function Users() {
  const [users, setUsers] = useState(dummy)
  const {isAdmin} = useContext(UserContext)

  return (
    // <>
    // {isAdmin ?
      <>
        <PageHeader title="Manage Users" heroImg={heroImg} />
        <div className="container container__user_management">
          <Table items={users} keyName="_id"/>
        </div>
      </> 
    //   :
    //   <Redirect to="/users/me" />
    // }
    // </>
  )
}

export default Users