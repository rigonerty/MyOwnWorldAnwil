import React from 'react'
import {Link} from 'react-router-dom';
import cl from "./Footer.module.css"
export const Footer = () => {
  return (
    <footer className={cl.footer}>
        <div>
            <h2>
                Inspiration:
            </h2>
            <Link to={"https://www.worldanvil.com"}>WorldAnvil</Link>
        </div>
    </footer>
  )
}
