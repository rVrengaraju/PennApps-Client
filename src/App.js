import React, {Component} from 'react';
import logo from './logo.svg';
import Grid from './Components/Grid/Grid'
import './App.css';
import {Helmet} from 'react-helmet';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

class App extends Component {
		state = {
    	currTicker: '',
    	tickerList: [],
  	};

  	handleChange = (event) => {
  		this.setState({currTicker: event.target.value})
	}

	submitTicker = (e) => {
		e.preventDefault()
		// console.log(`${this.state.currTicker.toUpperCase()}`)
		fetch(`http://localhost:8080/stock/${this.state.currTicker.toUpperCase()}`)
		  .then(response => response.json())
		  .then(json => {
		  	this.setState({tickerList: json})
		  	// console.log(this.state.tickerList)
		  	this.setState({currTicker: ""})
		  })
		  .catch(() => {
		  	this.setState({currTicker: ''}) 
		  	alert("Wrong Stock Ticker!")
		  })
	}

	clearTickerList = (e) => {
		e.preventDefault()
		this.setState({tickerList: []})
	}

	render() {
	    return (
			<div>
				<Helmet>
	                <style>{'body { background-color: #DDA0DD; }'}</style>
	            </Helmet>
				



<form> 
<label class="field a-field a-field_a1">
    <input class="field__input a-field__input" placeholder="e.g. AAPL" type="text" name="title" value={this.state.currTicker} onChange={this.handleChange} required/>
    <span class="a-field__label-wrap">
      <span class="a-field__label">STOCK TICKER</span>
    </span>
  </label>
<button class="pure-button pure-button-primary"onClick={this.submitTicker}>ADD</button>
<button class="pure-button pure-button-primary"onClick={this.clearTickerList}>CLEAR</button>
</form>


  


  







				<Grid lst={this.state.tickerList}/>
			</div>
	    );
	}
}

export default App;
