import React from 'react'
import './tablero.css'

class ArmarTablero extends React.Component {
   
   constructor(props) {
      super(props);
      this.state = {
         fichas: [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
         tablero: [],
         fichasSeleccionadas: [],
         pares: '3',
      };
   }


   _armarTablero = () => {
      this._seleccionoFichas(this.state.fichas)
      this._armoGrilla(3,2)
   }

   _pares = (event) => {
      this.setState({
         pares: event.target.value,
      },() => console.log("pares:", this.state.pares))
   }

   _seleccionoFichas = (arrayDeFichas) => {
		let misFichas = [...arrayDeFichas]
      let updatedStateFicha = []
      for(let i = 0; i < this.state.pares; i++){
			let indiceRandom = Math.floor(Math.random() * misFichas.length)
         updatedStateFicha = [ ...updatedStateFicha , misFichas[indiceRandom], misFichas[indiceRandom] ]
      }
      this.setState({
         fichasSeleccionadas: updatedStateFicha
      }, () => console.log("state.fichasSeleccionadas1:", this.state.fichasSeleccionadas))
   }
   
   _armoGrilla = (filas, columnas) => {
      console.log("state.fichasSeleccionadas2:",this.state.fichasSeleccionadas)
      console.log("state.fichasSeleccionadas2 length:",this.state.fichasSeleccionadas.length)

      for(let i = 0; i < filas; i++){
         let updatedStateFila = []

         for(let x = 0; x < columnas; x++){
            let indiceRandom = Math.floor(Math.random() * this.state.fichasSeleccionadas.length)
            let ficha = this.state.fichasSeleccionadas[indiceRandom]
            updatedStateFila = [ ...updatedStateFila , ficha]
            console.log("ficha:",ficha)
            console.log("updatedStateFila:",updatedStateFila)
         }
      }
   }

   



   render(){
		return <div className="armarTablero">
         <label>Cantidad de pares: </label> 
         <input type="number" value={this.state.pares} onChange={this._pares} min="2"></input>
         <button onClick={this._armarTablero}>Jugar</button>
      </div>
   }
}


export default ArmarTablero