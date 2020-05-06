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
    //this.state = {isVisible: false}
  }

  _cardClicked() {
   alert(this.props.cardLabel)
    //this.setState({isVisible: true})
  }

  render(){
    //const isVisible = this.state.isVisible;

    return <div onClick={this._cardClicked} className="ficha"> 
      {this.props.isVisible ? this.props.cardLabel : '?' }
    </div>
  }
}

export default Ficha



