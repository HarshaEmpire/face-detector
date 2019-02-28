import React from  'react';

class Signin extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			signin:"",
			password:""
		}
	}
	onEmailChange =(event)=>{
		this.setState({signin:event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({password:event.target.value})
	}
	onSubmit=()=>{
		fetch("http://localhost:3000/signin",{
			method: 'post',
			headers :{'Content-Type':'application/json'},
			body :JSON.stringify({
				email:this.state.signin,
				password:this.state.password
			})
		}).then(res => res.json())
		.then(user => {
			if(user.id){
				this.props.loadUser(user);
				this.props.OnrouteChange('home');}
		})
		
	}
	render(){
	return(
		<article  style={{marginTop:"200px"}} className=" ma80 br3 shadow ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center"  >
			<main className="pa4 black-80"  >
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" >Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" 
			        onChange={this.onEmailChange}
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" >Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" 
			        onChange={this.onPasswordChange} />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      onClick={this.onSubmit}
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Sign in" 
			      />
			    </div>
			    <div className="lh-copy mt3">
			      <p  onClick={()=>this.props.OnrouteChange("register")} className="f6 link dim black db pointer">register</p>
			    </div>
			  </div>
			</main>
		</article>
		);
}}
export default Signin;