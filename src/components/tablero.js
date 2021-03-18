import React from 'react'
import './tablero.css'

import Ficha from '../components/ficha'
import Contador from '../components/contador'
import Victoria from '../components/victoria'
import TableroClient from '../clients/TableroClient'
import ArmarTablero from '../components/armarTablero'
import Error from '../components/error'

class Tablero extends React.Component {
   
   constructor(props) {
		super(props);
    	this.state = {
			tablero: [],
			tableroId: '',
			paresEncontrados: [],
			posiblePar: [],
			status:'START',
			attempts: 0,
			mustCheckForVictory: false,
			error: null
		};
		this.setState = this.setState.bind(this)
		let cliente = new TableroClient(this.setState)
		this.tableroClient = cliente
	}

   _clickEnFicha = (coorX,coorY) => {
		switch(this.state.posiblePar.length){
			case 0:
				this.tableroClient.getChipContent(this.state.tableroId, coorX, coorY, this.state.posiblePar)
				break;
			case 1:
				this.tableroClient.getChipContent(this.state.tableroId, coorX, coorY, this.state.posiblePar)
				this.tableroClient.compareChips(this.state.tableroId, this.state.posiblePar[0].posX, this.state.posiblePar[0].posY, coorX, coorY, this.state.paresEncontrados)
				//this.tableroClient.getGameStatus(this.state.tableroId)
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

	_toMainMenu = () => {
		this.setState({ status:'START'})
	}

	componentDidUpdate(prevProps) {
		if(this.state.mustCheckForVictory){
			this.setState({ mustCheckForVictory: false }, 
				() => this.tableroClient.getGameStatus(this.state.tableroId))
	  	}
	}


	render(){
		console.log('xxxxxx',this.state)
		
		if(this.state.status === 'START') {
			return (
				<React.Fragment>
					<Error data={this.state.error} />
			 		<ArmarTablero formAction={this.tableroClient.requestBoard} />
				</React.Fragment>
			)
		}
		
		return <React.Fragment>
			<div className="tablero">
				{ 
					this.state.tablero.map((row, y) => {
						return (
							<React.Fragment>
								<Error data={this.state.error}  />
								<div className="tablero-row" key={y} > 
								{ 
									row.map( (card, x) => {
										const cardLabel = this._flipCard(x, y)
										const isVisible = !!cardLabel
										const yaElegida = () => {}
										return <Ficha
											cardLabel={cardLabel} 
											key={x} 
											isVisible={isVisible} 
											coordenadas={ isVisible ? yaElegida : () => this._clickEnFicha(x, y)}
										/>;		    						
									})
								}
							</div>
							</React.Fragment>
						)
					})
				}
			</div>
			<Contador intentos={this.state.attempts} />
			<Victoria onNewGame={this._toMainMenu} show={this.state.status === 'FINISHED'} />
			
		</React.Fragment>
	}
}

export default Tablero