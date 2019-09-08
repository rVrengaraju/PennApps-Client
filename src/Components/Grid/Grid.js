import React, { Component } from 'react';
import {PythonShell} from 'python-shell';
import './Grid.css'

class Grid extends Component{

	popUp = () => {

	}

	goldMan = (description) => {
		PythonShell.run('my_script.py', null, function (err) {
		  if (err) throw err;
		  console.log('finished');
		});
	}

	render() {
		let listItems = []

		for(let i=0; i<this.props.lst.length; i++){
			listItems.push(<li key={i} className="card" onClick={() => this.goldMan(this.props.lst[i][1])}><div className="ticker">{this.props.lst[i][0]}</div>{this.props.lst[i][1]}</li>)
		}


		return (
		<div>
			{listItems }
		</div>
		);
	}
}

export default Grid