import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
	/*
	BoardList() {
		console.log("Bitch")
		return $.getJSON('api/boards').then((data) => {
			this.setState({ boards: data.results });
		});
	}*/

	render() {
	  console.log('SUPPP')
	  return (
	  	<div>
			<ul className="list-group">
			  <li className="list-group-item"><NavLink to="/boards/dick">Cras justo odio</NavLink></li>
			  <li className="list-group-item"><NavLink to="/boards/bitch">Dapibus ac facilisis</NavLink></li>
			  <li className="list-group-item"><NavLink to="/boards/fuck">Morbi leo risus</NavLink></li>
			  <li className="list-group-item"><NavLink to="/boards/ass">Porta ac consectetur ac</NavLink></li>
			  <li className="list-group-item"><NavLink to="/boards/suck">Vestibulum at eros</NavLink></li>
			</ul>
			{this.props.children}
		</div>
	  )
	}
})