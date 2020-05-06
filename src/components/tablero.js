import React from 'react'
import './tablero.css'

import Ficha from '../components/ficha'



class Tablero extends React.Component {


	constructor(props) {
    	super(props);
    	this.state = {
      	tablero: [['A','B','A','F'],['D','D','B','C'],['E','F','C','E']],
      	paresEncontrados: [['D','D'],['A','A']]
    	};
  	}

	render(){
		return <div className="tablero">
			{ 
				this.state.tablero.map(function(row, x) {
  					return (
  						<div className="tablero-row" key={x}>
		  					{ 
		  						row.map(function(card, y) {
		    						return <Ficha cardLabel={card} key={y} isVisible={false} />;
		  						})
		  					}
	  					</div>
  					)
				})
			}

		</div>
	}
}

export default Tablero

