import React from 'react'
import './tablero.css'

import Ficha from '../components/ficha'
import Contador from '../components/contador'
import { fichas, armarTablero} from '../utils/logica'

class Tablero extends React.Component {
   
   constructor(props) {
    	super(props);
    	this.state = {
			tablero: [],
			posiblePar: [],
			paresEncontrados: [],
			intentos: 0,
    	};
	}
	  

	_generarTablero = () => {
		let miTablero= armarTablero(fichas,4,3)
		this.setState({ tablero: miTablero})
	}

	componentDidMount() {
		this._generarTablero()
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
				// actualizo la cantidad de intentos
				this._sumarIntentos();
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


	_sonPares = (coorX1, coorY1, coorX2, coorY2) => {
		return (this.state.tablero[coorX1][coorY1] === this.state.tablero[coorX2][coorY2]) ? true : false
	}

	_sumarIntentos = () => {
		this.setState({
			intentos: this.state.intentos + 1
		}, () => console.log("intentos", this.state.intentos))
	}


	render(){
		return <React.Fragment>

			<div className="tablero">
				{ 
					this.state.tablero.map((row, x) => {
						return (
							<div className="tablero-row" key={x} > 
								{ 
									row.map( (card, y) => {
										const isVisible = this._flipCard(x, y)
										const yaElegida = () => {}

										return <Ficha 
											cardLabel={card} 
											key={y} 
											isVisible={isVisible} 
											coordenadas={ isVisible ? yaElegida : () => this._clickEnFicha(x, y)}
										/>;		    						
									})
								}
							</div>
						)
					})
				}
			</div>
			<Contador intentos={this.state.intentos} />
		</React.Fragment>
	}
}

export default Tablero