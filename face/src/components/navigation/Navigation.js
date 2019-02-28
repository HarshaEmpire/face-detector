import React from  'react';
import "./Navigation.css"
const Navigation =({OnrouteChange,clearState})=>{
	return(
		<nav style={{display:"flex",justifyContent:"flex-end"}}>
			<p onClick={function() {OnrouteChange("signin");clearState()}} className="b1">Sign Out</p>
		</nav>
		);
}
export default Navigation;