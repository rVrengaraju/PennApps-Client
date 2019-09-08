import React, { Component } from 'react';
import './Grid.css'

class Grid extends Component{



	alertEvent = (d) => {
		alert("You have clicked on: "+d)
	}

	render() {
		console.log(this.props.lst)
		const listItems = this.props.lst.map((d, index) => <li key={index} className="card" onClick={() => this.alertEvent(d)}>{d}</li>);

		return (
		<div>
			{listItems }
		</div>
		);
	}
}

export default Grid