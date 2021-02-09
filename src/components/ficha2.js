import React from 'react'
import './ficha2.css'


class Ficha extends React.Component {   

  	_cardClicked = () => {
		this.props.coordenadas()
	}
  
  	render(){
		  
		{/* const active = this.props.isVisible ? 'ficha active1 front' : 'ficha back';*/}

		return <div className="flip-container">
			<div className="flipper">
				<div className="ficha front" onClick={this._cardClicked} > 
					{/* {this.props.isVisible ? this.props.cardLabel : '?' }*/}
					?
				</div>
				<div className="ficha back" > 
					{this.props.cardLabel}
				</div>
			</div>
		</div>
 	}
}

export default Ficha


