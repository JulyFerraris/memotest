import React from 'react'
import './ficha2.css'


class Ficha extends React.Component {   

	constructor(props) {
		super(props)
		this._wrapperRef = React.createRef()
	}


  	_cardClicked = () => {
		this.props.coordenadas()
		this._flipCard()
	}

	_flipCard = () => {
		const wrapper = this._wrapperRef.current
		wrapper.classList.toggle('is-flipped')
	}
  
  	render(){
		  
		{/* const active = this.props.isVisible ? 'ficha active front' : 'ficha back';*/}

		return <div className="flip-container" ref={this._wrapperRef}>
			<div className="flipper">
				<div className="ficha front" onClick={this._cardClicked} > 
					{/* {this.props.isVisible ? this.props.cardLabel : '?' }*/}
					?
				</div>
				<div className="ficha back" onClick={this._flipCard} > 
					{this.props.cardLabel}
				</div>
			</div>
		</div>
 	}
}

export default Ficha


