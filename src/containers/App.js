import React from 'react';
import { connect } from 'react-redux'
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageForm from '../components/ImageForm/ImageForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import './App.css'
import Particles from 'react-particles-js';
import {URL_API} from '../config';

const routeState = {
    APP: 'app',
    LOGIN: 'login',
    REGISTER: 'register',
}


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
const initialState = {
    input:'',
    imageUrl: '',
    box: {},
    route: routeState.LOGIN,
    isLoggedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends React.Component{
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    }

    calculateFace = (data) => {
        const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.querySelector('#inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifyFace.left_col * width,
            topRow: clarifyFace.top_row * height,
            rightCol: width - (clarifyFace.right_col * width),
            bottomRow: height - (clarifyFace.bottom_row * height),
        }
    }
    displayFace = (box) => {
        this.setState({box: box})
    }

    onInputChange = (event) => {
        this.setState({input:event.target.value})
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        fetch(URL_API + '/imageurl', {
            method: 'post', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({input: this.state.input})
        })
        .then(response => response.json())
        .then(response => {
            if (response){
                fetch(URL_API + '/image', {
                    method: 'put', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                      })
                })
                .then(response => response.json())
                .then(count => {
                    console.log('dbg count', count)
                    this.setState(Object.assign(this.state.user, {entries:count})); // we only want to change entries for user
                })
                .catch(console.log);
            }
            this.displayFace(this.calculateFace(response))
        })
        .catch(err => console.log(err));
    }

    onRoute = (route) => {
        if (route === routeState.LOGIN) {
            this.setState(initialState);
        } else if (route === routeState.APP) {
            this.setState({isLoggedIn: true});
        }
        this.setState({route: route});
    }

    routeToRegister = () => {
        this.onRoute(routeState.REGISTER)
    }
    routeToLogin = () => {
        this.onRoute(routeState.LOGIN)
    }
    routeToApp = () => {
        this.onRoute(routeState.APP)
    }


    render(){
        const { isLoggedIn, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <Particles className='particles' 
                    params={particleOptions} />
                <Navigation onLogin={this.routeToLogin} 
                            onRegister={this.routeToRegister} 
                            isLoggedIn={isLoggedIn} 
                />
                { route === routeState.APP
                    ? <div>
                        <Logo />
                        <Rank name={this.state.user.name} entries={this.state.user.entries} />
                        <ImageForm 
                            onInputChange={this.onInputChange} 
                            onButtonSubmit={this.onButtonSubmit} />
                        <FaceRecognition box={box} imageUrl={imageUrl} />
                    </div>
                    :(
                        route === routeState.LOGIN
                        ? <Login onRoute={this.routeToApp} 
                                onRegister={this.routeToRegister}
                                loadUser={this.loadUser} 
                          />
                        :
                        <Register onRoute={() => this.onRoute(routeState.APP)} 
                                onRegister={() => this.onRoute(routeState.REGISTER)}
                                loadUser={this.loadUser} 
                          />

                    )
                }
            </div>
        );
        

    }
}

// Connecting App to redux Store
export default App;
