import React from 'react'
import './tablero.css'

import Ficha from '../components/ficha'


class Tablero extends React.Component {
   
   constructor(props) {
    	super(props);
    	this.state = {
         tablero: [['A','B','A','F'],['D','D','B','C'],['E','F','C','E']],
			posiblePar: [],
			paresEncontrados: []
    	};
  	}


   _clickEnFicha = (coorX,coorY) => {

		switch(this.state.posiblePar.length) {
			
			case 0:
				//guardo la primer ficha  en "posiblePar"
				this.setState({
					posiblePar: [ ...this.state.posiblePar, [coorX, coorY]],
				}, () => console.log('ficha1:', this.state.posiblePar))
				break;
			
			case 1:
				// si entra acá es porque ya seleccionó 2 fichas
				const coorX2 = this.state.posiblePar[0][0]
				const coorY2 = this.state.posiblePar[0][1]
				
				// si no la había elegido antes la agrego a posiblePar
				if(this._fichaYaElegida(coorX,coorY,coorX2,coorY2) === false) {
					this.setState({
						posiblePar: [ ...this.state.posiblePar, [coorX, coorY]],
					}, () => console.log('ficha1 y 2:', this.state.posiblePar))
					
					// y si son pares las guardo en "paresEncontrados"
					if(this._sonPares(coorX, coorY,coorX2,coorY2)) {
						this.setState({
							paresEncontrados: [...this.state.paresEncontrados,[coorX,coorY],[coorX2,coorY2] ]
							}, () => console.log("encontrados", this.state.paresEncontrados)
						)
					}
				}
				break;

			case 2:
				// Acá empieza una nueva jugada
				// saco de "posiblePar" las fichas de la jugada anterior y dejo la seleccionada
				this.setState({
					posiblePar: [[coorX, coorY]]
				}, () => console.log('ficha1:', this.state.posiblePar))
				break;

			default:
				console.log('Ups, algo salió mal');
		}
	}



	_flipCard = (coorX, coorY) => {
		//si hizo click
		for(let i = 0; i < this.state.posiblePar.length; i++){
			if (this.state.posiblePar[i][0] === coorX && this.state.posiblePar[i][1] === coorY){
				return true
			}
		}
		// Si estan en "paresEncontrados" 
		for(let i = 0; i < this.state.paresEncontrados.length; i++){
			if (this.state.paresEncontrados[i][0] === coorX && this.state.paresEncontrados[i][1] === coorY){
				return true
			}
		}
		return false
	}



	//Verifica que no seleccione 2 veces la misma ficha y que no este en el ParesEncontrados
	_fichaYaElegida = (coorX1, coorY1, coorX2, coorY2) => {
		
		if(coorX1 === coorX2 && coorY1 === coorY2  ){
			alert('elige otra ficha')
			return true
		}  else {
			return false
		}
	}


	_sonPares = (coorX1, coorY1, coorX2, coorY2) => {
		return (this.state.tablero[coorX1][coorY1] === this.state.tablero[coorX2][coorY2]) ? true : false
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
										isVisible={this._flipCard(x, y)} 
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