import React from 'react'
import './ficha.css'


{/*
const Ficha = () => {
	_cardClicked = () => alert(this.props.cardLabel);
	return <div onClick={this._cardClicked} className="ficha"> 
    {this.props.isVisible ? this.props.cardLabel : '?' }
  </div>
}*/}



class Ficha extends React.Component {   

  	_cardClicked = () => alert(this.props.cardLabel)
  
  	render(){
		return <div className="ficha"
			onClick={() => {this.props.coordenadas(); this._cardClicked();}} > 
      		{this.props.isVisible ? this.props.cardLabel : '?' }
    	</div>
 	 }
}

export default Ficha


