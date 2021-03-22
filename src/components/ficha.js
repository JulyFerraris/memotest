import React from 'react'
import './ficha.css'


class Ficha extends React.Component {   

	constructor(props) {
		super(props)
		this._wrapperRef = React.createRef()
	}


  	_cardClicked = () => {
		this.props.coordenadas()
	}

	_flipCard = () => {
		const wrapper = this._wrapperRef.current
		wrapper.classList.toggle('is-flipped')
	}

	componentDidUpdate(prevProps) {
		if(this.props.isVisible !== prevProps.isVisible) {
			this._flipCard()
		}
	}
  
  	render(){
		return <div className="flip-container" ref={this._wrapperRef}>
			<div className="flipper">
				<div className="ficha front" onClick={this._cardClicked}>?</div>
				<div className="ficha back">{this.props.cardLabel}</div>
			</div>
		</div>
 	}
}

export default Ficha


