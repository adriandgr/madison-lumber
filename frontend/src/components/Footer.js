import React from "react";

function SocialLinks() {
  const links = [
    {
      url: "https://twitter.com/LumberNews",
      icon: "fa-twitter-square"
    },
    {
      url: "https://www.instagram.com/lumbernews/",
      icon: "fa-instagram"
    },
    {
      url: "https://www.facebook.com/MadisonsLumberReporter",
      icon: "fa-facebook-square"
    }
  ]
  return (
    <div className="columns is-mobile is-3 columns__social_links">
      {links.map(link =>(
        <div className="column" key={link.icon}>
          <a href={link.url}>
            <span className="icon is-medium">
              <i className={`fab fa-lg ${link.icon}`}></i>
            </span>
          </a>
        </div>
      ))}
    </div>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          © 2017-{currentYear}{" "}
          <strong>
            <a href="https://madisonsreport.com/">Madison's Lumber Reporter</a>
          </strong>
        </p>
        <SocialLinks/>
      </div>
    </footer>
  );
}

export default Footer;
