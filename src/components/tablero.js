import React from 'react'
import './tablero.css'

import Ficha from '../components/ficha'



class Tablero extends React.Component {


	constructor(props) {
    	super(props);
    	this.state = {
      	tablero: [['A','B','A','C'],['D','D','B','C']],
    	};
  	}

	render(){
		return <div className="tablero">
			{ 
				this.state.tablero.map(function(row, index) {
  					return (
  						<div className="tablero-row" key={index}>
		  					{ 
		  						row.map(function(card, index) {
		    						return <Ficha label={card} key={index}/>;
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

