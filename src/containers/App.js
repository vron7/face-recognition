import React from 'react';
import { connect } from 'react-redux'
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageForm from '../components/ImageForm/ImageForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import './App.css'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '4a2261430bdb4608bf8b8fa69b7b053d'
});


const particleOptions = {    
    particles: {
        number:{
            value: 60,
            density:{
                enable: true,
                value_area: 800
            }
        }

    }    
}

class App extends React.Component{
    constructor() {
        super();
        this.state = {
            input:'',
            imageUrl: ''
        }
    }

    onInputChange = (event) => {
        this.setState({input:event.target.value})
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        })
        .catch(err => {
          console.log(err);
        });
    }

    render(){
        return (
            <div className="App">
                <Particles className='particles' 
                    params={particleOptions} />
                <Navigation />
                <Logo />
                <Rank />
                <ImageForm 
                    onInputChange={this.onInputChange} 
                    onButtonSubmit={this.onButtonSubmit} />
                <FaceRecognition imageUrl={this.state.imageUrl} />
            </div>
        );
        

    }
}

// Connecting App to redux Store
export default App;
