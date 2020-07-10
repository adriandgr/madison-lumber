import React, {useEffect, useState} from "react";
import { Helmet } from "react-helmet";
import Cookies from 'universal-cookie'

function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false)
  const [cookieConsent, setCookieConsent] = useState(false)

  useEffect(() => {
    const cookies = new Cookies()
    const cookiePolicy = cookies.get('cookie-policy')
    
    
    if (cookiePolicy) {
      setCookieConsent(cookiePolicy)
    } else {
      setTimeout(()=> setIsVisible(true),2000)
    }
  },[])

  function handleClick(event) {
    const {ariaLabel} = event.target
    const cookies = new Cookies()
    if (ariaLabel === "Accept" || ariaLabel === "Reject") {
      cookies.set('cookie-policy', ariaLabel, { path: '/', maxAge: 31540000 })
    }
    setIsVisible(false)
  }

  console.log("cookie policy", cookieConsent)
  return (
    <>
    {isVisible && <>
    <Helmet htmlAttributes={{ class: "is-clipped" }} />
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <span class="icon is-large">
                  <i class="fas fa-3x fa-cookie-bite"></i>
                </span>
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <h3>We use cookies responsibly</h3>
                  <em>We respect your privacy.</em> We use cookies or similar
                  technologies as specified in our cookie policy.
                </p>
                <ul>
                  <li>
                    We use{" "}
                    <a href="https://matomo.org/privacy/">
                      open source software
                    </a>
                    , not Google
                  </li>
                  <li>We respect your browser's DoNotTrack setting</li>
                  <li>We anonymize visitor IP Addresses</li>
                  <li>We do not sell or share any data to any third-parties</li>
                </ul>
                <div className="columns">
                  <div className="column is-7">
                    <button className="button">Learn more and customize</button>
                  </div>
                  <div className="column is-2">
                    <button className="button is-primary" aria-label="Reject" onClick={handleClick}>
                      Reject
                    </button>
                  </div>

                  <div className="column is-2">
                    <button className="button is-primary" aria-label="Accept" onClick={handleClick}>
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    </>}</>
  );
}

export default CookieNotice