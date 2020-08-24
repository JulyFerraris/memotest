import React from 'react'
import './tablero.css'

import Ficha from '../components/ficha'
import Contador from '../components/contador'
import { fichas, armarTablero} from '../utils/logica'
import TableroClient from '../clients/TableroClient'

import ArmarTablero from '../components/armarTablero'




class Tablero extends React.Component {
   
   constructor(props) {
		super(props);
    	this.state = {
			tablero: [],
			tableroId: '',
			paresEncontrados: [],
			posiblePar: [],
			status:'PLAYING',
			attempts: 0,
			iniciarPartida: true,
		};
		 
		this.setState = this.setState.bind(this)
		let cliente = new TableroClient(this.setState)
		this.tableroClient = cliente
	}

	componentDidMount() {
		this.tableroClient.requestBoard(2,3)
	}

   _clickEnFicha = (coorX,coorY) => {
		switch(this.state.posiblePar.length){
			case 0:
				this.tableroClient.getChipContent(this.state.tableroId, coorX, coorY, this.state.posiblePar)
				break;
			case 1:
				this.tableroClient.getChipContent(this.state.tableroId, coorX, coorY, this.state.posiblePar)
				this.tableroClient.compareChips(this.state.tableroId, this.state.posiblePar[0].posX, this.state.posiblePar[0].posY, coorX, coorY, this.state.paresEncontrados)
				this.tableroClient.getGameStatus(this.state.tableroId)
				break;
			case 2:
				this.tableroClient.getChipContent(this.state.tableroId, coorX, coorY, [])
				break;
			default:
				console.log('Ups, algo salió mal');
		}
	}

	_flipCard = (coorX, coorY) => {
		//si hizo click
		for(let i = 0; i < this.state.posiblePar.length; i++){
			if (this.state.posiblePar[i].posX === coorX && this.state.posiblePar[i].posY === coorY){
				return this.state.posiblePar[i].value
			}
		}
		// Si estan en "paresEncontrados" 
		for(let i = 0; i < this.state.paresEncontrados.length; i++){
			if (this.state.paresEncontrados[i].posX === coorX && this.state.paresEncontrados[i].posY === coorY){
				return this.state.paresEncontrados[i].value
			}
		}
		return ''
	}


	_armarTablero = () => {
		this.setState({
			iniciarPartida: true
		})
	}

	_nuevoJuego = (filas, columnas) => {
		this.setState({
			tablero: [armarTablero(fichas,filas,columnas)],
			paresEncontrados: [],
			posiblePar: [],
			status:'PLAYING',
			attempts: 0,
			iniciarPartida: false
		})
		this.tableroClient.requestBoard(filas,columnas)
	}

	



	render(){
		
		return <React.Fragment>
				
			{this.state.iniciarPartida ? 
				<ArmarTablero formAction={this._nuevoJuego} />
			: 
				<React.Fragment>
					<div className="tablero">
						{ 
							this.state.tablero.map((row, x) => {
								return (
									<div className="tablero-row" key={x} > 
										{ 
											row.map( (card, y) => {
												const cardLabel = this._flipCard(x, y)
												const isVisible = !!cardLabel
												const yaElegida = () => {}
												return <Ficha 
													cardLabel={cardLabel} 
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
					<Contador intentos={this.state.attempts} />
					{this.state.status === 'FINISHED' ? 
						<React.Fragment>
      					<h2>¡Ganaste!</h2>
      					<button onClick={this._armarTablero} >Nuevo Juego</button>
						</React.Fragment> 
					: null }
				</React.Fragment>
			}
			
		</React.Fragment>
	}
}

export default Tablero