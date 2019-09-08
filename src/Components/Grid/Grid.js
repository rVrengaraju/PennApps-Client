import React, { Component } from 'react';


class Grid extends Component{

	render() {
		console.log(this.props.lst)
		const data =[{"name":"test1"},{"name":"test2"}];
		const listItems = this.props.lst.map((d, index) => <li key={index}>{d}</li>);
		return (
		<div>
			{listItems }
		</div>
		);
	}
}

export default Grid