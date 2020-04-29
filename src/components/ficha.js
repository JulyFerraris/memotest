import React from 'react'
import './ficha.css'



const Ficha = (props) => {
	return <div className="ficha" id={props.fichaId} >{props.label}</div>
}


export default Ficha