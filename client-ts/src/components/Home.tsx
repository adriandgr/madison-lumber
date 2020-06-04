import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import madisonLogo from './assets/madison-logo.png';
import headerBg from './assets/header-img.jpg';
import AlertMessages from './shared/AlertMessages';
import { UserContext } from './users/UserContext'

const landingDescription = `The most comprehensive listing of Canadian solid wood and pulp manufacturers anywhere, 
  Madison's Online Lumber Directory has been published for over 60 years. Company information includes contacts, tree 
  species, rough and finished lumber sizes, lumber production volumes, countries of lumber export, and much, much more.
  A sample viewing of Madison's Online Directory is available HERE, the full database contains more than 1,799 individual 
  solid wood and pulp producer entries. Further details and a link to our Madison's Directory order form is HERE.`

const Home = (props:RouteComponentProps) => (
    <UserContext.Consumer>
      {context => (
          <div className="container">
            {context.token &&
            <AlertMessages success={context.successAuth}/>
            }
            <div className="jumbotron text-center section-banner"
                 style={{backgroundImage: `url(${headerBg})`}}>
              <img src={madisonLogo} alt="Madison's Lumber" width="150px"/>
              <h2 className="heading-brand">Madison's Lumber Directory</h2>
            </div>
            <h3>Lumber Directory Database</h3>
            <p>{landingDescription}</p>
          </div>
      )}
    </UserContext.Consumer>
)

export default Home;