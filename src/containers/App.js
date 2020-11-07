import React from 'react';
import { connect } from 'react-redux'
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageForm from '../components/ImageForm/ImageForm';
import Rank from '../components/Rank/Rank';
import './App.css'
import Particles from 'react-particles-js';


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
    render(){
        return (
            <div className="App">
                <Particles className='particles' 
                    params={particleOptions} />
                <Navigation />
                <Logo />
                <Rank />
                <ImageForm/>
            </div>
        );
        

    }
}

// Connecting App to redux Store
export default App;
