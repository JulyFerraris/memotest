import React from 'react'
import './armarTablero.css'

class ArmarTablero extends React.Component {

   constructor(props) {
		super(props);
    	this.state = {
			filas: 2,
			columnas: 2
		};
   }

   _onSubmit = (event) => {
      event.preventDefault();
      this.props.formAction(this.state.filas, this.state.columnas);
   }

   _onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   render(){
      return(
         <div className="form">
            <h4>Armá tu tablero</h4>
            <form onSubmit={this._onSubmit}>
               <fieldset>
                  <label>Columnas: </label>
                  <input type="number"
                     min="2" 
                     name="columnas"
                     value={this.state.columnas}
                     onChange={this._onChange} 
                  />
               </fieldset>
               <fieldset>
                  <label>Filas: </label>
                  <input type="number"
                     min="1" 
                     name="filas"
                     value={this.state.filas}
                     onChange={this._onChange} 
                  />
               </fieldset>
               <button type="submit">Comenzar</button>
            </form>
         </div>
      )
   }
}


export default ArmarTablero