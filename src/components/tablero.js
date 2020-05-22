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
		let clickeada = false;
		
      this.setState({
			fichasClickeadas: [ ...this.state.fichasClickeadas, [coorX, coorY]]
		}, () => console.log("clickeadas", this.state.fichasClickeadas) )
		
		/* for(var i = 0; i < this.state.fichasClickeadas.length; i++){
			if(this.state.fichasClickeadas[i][0] === coorX && this.state.fichasClickeadas[i][1] === coorY){
				clickeada = true;
			}
		} */

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
										isVisible={false}
										coordenadas={() => this._clickEnFicha(x, y)}
										fueClickeada={() =>this._repetida(x, y) }
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

