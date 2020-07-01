import React from 'react'
import heroImg from '../assets/header-img.jpg'
import PageHeader from '../components/PageHeader'


function Home() {
  const landingDescription = `Madison's Lumber Directory has been published for over 60 years. Company information includes contacts, tree 
  species, rough and finished lumber sizes, lumber production volumes, countries of lumber export, and much, much more.
  A sample viewing of Madison's Online Directory is available HERE, the full database contains more than 1,799 individual 
  solid wood and pulp producer entries. Further details and a link to our Madison's Directory order form is HERE.`

  return(
    <div>
      <PageHeader 
        title="Madison's Lumber Directory"
        subtitle="The most comprehensive listing of Canadian solid wood and pulp manufacturers"
        heroImg={heroImg}
        medium
      />
      <div className="container container__landing">
        <h4 className="title is-4">About our lumber database</h4>
        <p>{landingDescription}</p>
      </div>
      
    </div>
    
  )
}

export default Home