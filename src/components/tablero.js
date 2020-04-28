import React from 'react'
import './tablero.css'

import Ficha from '../components/ficha'


class Tablero extends React.Component {
	render(){
		return <div className="tablero">
			<Ficha />
		</div>
	}
}


export default Tablero