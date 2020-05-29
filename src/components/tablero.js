import React from 'react'
import './tablero.css'

import Ficha from '../components/ficha'


class Tablero extends React.Component {
   
   constructor(props) {
    	super(props);
    	this.state = {
         tablero: [['A','B','A','F'],['D','D','B','C'],['E','F','C','E']],
			fichasClickeadas: [],
			isVisible: false
    	};
  	}



   _clickEnFicha = (coorX,coorY) => {
		let clickeada = false;
		
      this.setState({
			fichasClickeadas: [ ...this.state.fichasClickeadas, [coorX, coorY]],
			isVisible: true,
		}, () => console.log("clickeadas", this.state.fichasClickeadas))

		this.state.fichasClickeadas.forEach((arrayItems) => {
			arrayItems[0] === coorX && arrayItems[1] === coorY ? clickeada= true : clickeada= false
		})
		console.log(clickeada)
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
										isVisible={this.state.isVisible}
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

