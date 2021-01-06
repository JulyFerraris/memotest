import React from 'react'
import './error.css'


const Error = (props) => {

   if(!props.data) return null

   return <div className="error">
      <p>{props.data.description}</p>
      { props.data.options.map((link, i) => <a href="#" onClick={link.action} key={i}>{link.description}</a>)}
   </div>
}

export default Error