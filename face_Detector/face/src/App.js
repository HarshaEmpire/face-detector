import React, { Component } from 'react';
import './App.css';
import {connect}  from 'react-redux'; 
import {onInputChange,onImgUrlChange,onBoxChange,onRouteChange,onUserChange,isSignedChange,clearHome} from "./action.js";
import Navigation from "./components/navigation/Navigation"
import Logo from "./components/logo/logo"
import Rank from "./components/rank/rank"
import ImageLinkForm from "./components/imgLink/imgLink"
import Particles from 'react-particles-js';
import FaceRec from "./components/faces/faces"
import Signin from "./components/signin/signin"
import Register from "./components/register/register"


const mapStateToProps = state =>{
  return {
    input:state.home.input,
    image_url:state.home.image_url,
    box:state.home.box,
    route:state.home.route,
    user:state.home.user,
    issignedin:state.home.issignedin

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  loadUser: (data) => dispatch(onUserChange(data)),
  onInputsChange: (event) => dispatch(onInputChange(event.target.value)),
  onBoxsChange: (data) => dispatch(onBoxChange(data)),
  onRoutesChange: (data) => dispatch(onRouteChange(data)),
  onImgUrlChange: (data) => dispatch(onImgUrlChange(data)),
  isSignedsChange: data => dispatch(isSignedChange(data)),
  onClean: () => dispatch(clearHome())
  }
}








const parameters ={
                particles: {
                number: {
                value:100,
                density: {
                enable:true,
                value_area:300,
                }
            }
        }
}




class App extends Component {

  calculateFace = (data) => {
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height= Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow :clarifaiFace.top_row *height,
      rightCol : width -(clarifaiFace.right_col * width),
      bottomRow :height -(clarifaiFace.bottom_row *height),
    }

  }

onClear = () => {
  this.props.onClean();
}


  OnSubmit = () => {
    this.props.onImgUrlChange(this.props.input);
    fetch("http://localhost:3000/imageurl",{
              method: 'post',
              headers :{'Content-Type':'application/json'},
              body :JSON.stringify({
                input:this.props.input
              })
          })
    .then(resp => resp.json())
    .then(response => {
        if(response.outputs[0].data) {
          fetch("http://localhost:3000/image",{
              method: 'put',
              headers :{'Content-Type':'application/json'},
              body :JSON.stringify({
                id:this.props.user.id
              })
          }).then(resp => resp.json())
          .then(count => {
            this.props.loadUser(Object.assign({},this.props.user,{entries:count}));
          })
          .catch(err => alert("please try again"));
          
        }
        this.props.onBoxsChange(this.calculateFace(response));
        

      }
    ).catch(err => alert("something went wrong check the image url"));

  }

  OnrouteChange = (route) => {
    this.props.onRoutesChange(route);
    if(route === "home"){
        this.props.isSignedsChange(true);
    }
    else
        this.props.isSignedsChange(false);
  }
  
  render() {
    return (
      <div className="App">
        <Particles className="particle"
              params={parameters}/>
        <Navigation OnrouteChange={this.OnrouteChange} clearState={this.onClear} issignedin={this.props.issignedin} email={this.props.user.email} />
        {this.props.route === 'signin'?
        <Signin OnrouteChange={this.OnrouteChange} loadUser={this.props.loadUser} />
        :this.props.route === 'home'? 
          
          <div>
            <Logo />
            <Rank user={this.props.user} />
            <ImageLinkForm OnInputChange={this.props.onInputsChange} OnSubmit={this.OnSubmit} />
            <FaceRec image_url={this.props.image_url} box={this.props.box} />
          </div>
          :<Register OnrouteChange={this.OnrouteChange} loadUser={this.props.loadUser} />}
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
