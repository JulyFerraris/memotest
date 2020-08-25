import React from 'react'


const Victoria = (props) => {
   return(
      <React.Fragment>
			<h2>¡Ganaste!</h2>
			<button onClick={() => props.onNewGame(2,3)} >Nuevo Juego</button>
		</React.Fragment> 
   )
}



export default Victoria