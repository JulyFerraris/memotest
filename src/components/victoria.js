import React from 'react'


const Victoria = (props) => {
   if (!props.show) return null
   return(
      <React.Fragment>
			<h2>¡Ganaste!</h2>
			<button onClick={props.onNewGame}>Nuevo Juego</button>
		</React.Fragment> 
   )
}

export default Victoria