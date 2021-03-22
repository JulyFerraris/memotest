import React from 'react'
import './error.css'


const Error = (props) => {

   if(!props.data) return null

   return <div className="error shakeX ">
      <p>{props.data.description}</p>
      { props.data.options.map((link, i) => <button type="button" onClick={link.action} key={i}>{link.description}</button>)}
   </div>
}

export default Error