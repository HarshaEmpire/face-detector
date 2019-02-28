import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/navigation/Navigation"
import Logo from "./components/logo/logo"
import Rank from "./components/rank/rank"
import ImageLinkForm from "./components/imgLink/imgLink"
import Particles from 'react-particles-js';
import Clarifai from "clarifai"
import FaceRec from "./components/faces/faces"
import Signin from "./components/signin/signin"
import Register from "./components/register/register"

const parameters ={
                particles: {
                number: {
                value:200,
                density: {
                enable:true,
                value_area:600,
                }
            }
        }
}




class App extends Component {
  constructor(){
    super();
    this.state= {
      input: '',
      image_url: '',
      box:{},
      route:'signin',
      user : {
        id:"",
        name:"",
        email:"",
        entries:"",
        joined:""
      }
    }
  }

loadUser = (data) =>{
  this.setState({user:{
    id :data.id,
    name:data.name,
    email:data.email,
    entries:data.entries,
    joined:data.joined
  }})
}

  onInputChange = (event ) =>{
    this.setState({input:event.target.value});
  }

  calculateFace = (data) => {
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height= Number(image.height);
    console.log(width,height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow :clarifaiFace.top_row *height,
      rightCol : width -(clarifaiFace.right_col * width),
      bottomRow :height -(clarifaiFace.bottom_row *height),
    }

  }


  displayFace = (box) => {
    console.log(box);
    this.setState({box :box})
  }

  OnSubmit = () => {
    this.setState({image_url:this.state.input});
    fetch("http://localhost:3000/imageurl",{
              method: 'post',
              headers :{'Content-Type':'application/json'},
              body :JSON.stringify({
                input:this.state.input
              })
          })
    .then(resp => resp.json())
    .then(response => {
        if(response) {
          fetch("http://localhost:3000/image",{
              method: 'put',
              headers :{'Content-Type':'application/json'},
              body :JSON.stringify({
                id:this.state.user.id
              })
          }).then(resp => resp.json())
          .then(count => {
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
          .catch(err => console.log("error occured"));
        }
        this.displayFace(this.calculateFace(response));

      }
    ).catch(err => console.log(1,err));

  }
  clearState = () =>{
    this.setState({
      input: '',
      image_url: '',
      box:{},
      route:'signin',
      user : {
        id:"",
        name:"",
        email:"",
        entries:"",
        joined:""
      }
    });
  }
  OnrouteChange = (route) => {
    this.setState({route :route});
    console.log(this.state.route);

  }

  render() {
    console.log(this.state.route);
    return (
      <div className="App">
        <Particles className="particle"
              params={parameters}/>
        {this.state.route === 'signin'?
        <Signin OnrouteChange={this.OnrouteChange} loadUser={this.loadUser} />
        :this.state.route === 'home'? 
          <div>
            <Navigation OnrouteChange={this.OnrouteChange} clearState={this.clearState} />
            <Logo />
            <Rank user={this.state.user} />
            <ImageLinkForm OnInputChange={this.onInputChange} OnSubmit={this.OnSubmit} />
            <FaceRec image_url={this.state.image_url} box={this.state.box} />
          </div>
          :<Register OnrouteChange={this.OnrouteChange} loadUser={this.loadUser} />}
      </div>
    );
  }
}

export default App;
