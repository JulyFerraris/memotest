import React from 'react'
import './ficha.css'



/*const Ficha = (props) => {

	_cardClicked() {
    	alert(this.props.label);
  	}

  	render(){
		return <div className="ficha" onClick={this._cardClicked.bind(this)} >{ this.props.label}</div>
	}
}*/



class Ficha extends React.Component {   

   constructor(props) {
    	super(props);
    	this._cardClicked = this._cardClicked.bind(this);
    	//this.state = {cardHide: true}
  	}


  	_cardClicked() {
    	alert(this.props.cardLabel)
    	//this.setState({cardHide: false})
  	}

  	

  	render(){
  		/*if(this.state.cardHide === true) {
  			return <div onClick={this._cardClicked} className="ficha"> ? </div>
  		}*/
		return <div onClick={this._cardClicked} className="ficha" cardVisibility={this.props.cardVisibility} > {this.props.cardLabel} </div>
	}
}

export default Ficha

