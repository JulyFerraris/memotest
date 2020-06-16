import React from 'react'
import './contador.css'


const Contador = (props) => {
   return <div className="contador">
      <b>Intentos:</b> {props.intentos}
   </div>
}

export default Contador