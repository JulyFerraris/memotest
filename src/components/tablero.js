import React from 'react'
import './tablero.css'

import Ficha from '../components/ficha'


class Tablero extends React.Component {
   
   constructor(props) {
    	super(props);
    	this.state = {
         tablero: [['A','B','A','F'],['D','D','B','C'],['E','F','C','E']],
         fichasClickeadas: []
    	};
  	}

   _clickEnFicha = (coorX,coorY) => {
	  	//console.log("coordenada " + coorX + "-" + coorY )
      this.setState({
			fichasClickeadas: [ ...this.state.fichasClickeadas, [coorX,coorY ]]
		})
		console.log("clickeadas", this.state.fichasClickeadas)
   }

	render(){
		return <div className="tablero">
			{ 
				this.state.tablero.map((row, x) => {
  					return (
						<div className="tablero-row" key={x} > 
		  					{ 
		  						row.map( (card, y) => {
                           return <Ficha 
										cardLabel={card} 
										key={y} 
										isVisible={false}
										coordenadas={() => this._clickEnFicha(x, y)}
                           />;		    						
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

