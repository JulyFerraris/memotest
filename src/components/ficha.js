import React from 'react'
import './ficha.css'


class Ficha extends React.Component {   

  	_cardClicked = () => {
		this.props.coordenadas()
	}
  
  	render(){
		  
		const active = this.props.isVisible ? 'ficha active' : 'ficha';

		return <div className={active} onClick={this._cardClicked} > 
      	{this.props.isVisible ? this.props.cardLabel : '?' }
    	</div>
 	}
}

export default Ficha


