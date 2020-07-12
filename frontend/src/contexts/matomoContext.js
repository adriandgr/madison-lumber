import React from "react"
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

const instance = createInstance({
  urlBase: 'https://matomo.madisonsreport.com/',
  siteId: 1
})

function MatomoContextProvider(props) {
  return (
    <MatomoProvider value={instance} >
      { props.children }
    </MatomoProvider>

  )
}

export default MatomoContextProvider