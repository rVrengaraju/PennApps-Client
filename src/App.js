import React, {Component} from 'react';
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
		fetch(`http://localhost:8080/stock/${this.state.currTicker.toUpperCase()}`)
		  .then(response => response.json())
		  .then(json => {
		  	this.setState({tickerList: json})
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
				

	            <div className="title">PORTFOLIO ADVISOR</div>

				<form autoComplete="off" className="space"> 
				<label className="field a-field a-field_a1">
				    <input className="field__input a-field__input" placeholder="e.g. AAPL" type="text" name="title" value={this.state.currTicker} onChange={this.handleChange} required/>
				    <span className="a-field__label-wrap">
				      <span className="a-field__label">STOCK TICKER</span>
				    </span>
				  </label>
				<button className="pure-button pure-button-primary space"onClick={this.submitTicker}>ADD</button>
				<button className="pure-button pure-button-primary space"onClick={this.clearTickerList}>CLEAR</button>
				</form>

				<Grid lst={this.state.tickerList}/>
			</div>
	    );
	}
}

export default App;
