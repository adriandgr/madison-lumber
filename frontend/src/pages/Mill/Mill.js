import React from 'react'
import {useParams} from 'react-router-dom'
import heroImg from "../../assets/kiln-dried-lumber.jpg"
import PageHeader from "../../components/PageHeader"

function Mill() {
  const {mill_uuid} = useParams()

  
  return(
    <>
      <PageHeader title="Hello Mill" heroImg={heroImg} />
      {mill_uuid}
    </>
  )

}

export default Mill