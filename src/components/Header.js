import React from 'react';
import { Link } from 'react-router';

const Header = () => {
	return (
		<header id="main-header">
			<div className="container">
				<div id="logo">
					<span>h</span>
				</div>
				<Link to="/"><h3>hakloev.no</h3></Link>
				<nav>
					<ul>
						<li><a href="">GitHub</a></li>
						<li><a href="">Twitter</a></li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
