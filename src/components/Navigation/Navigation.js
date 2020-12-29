import React from 'react'

const Navigation = ({onRegister, onLogin, isLoggedIn}) => {
        if (isLoggedIn){
            return(
                <nav style={{display:'flex', justifyContent:'flex-end', padding:'1em'}}>
                    <p onClick={onLogin} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                </nav>
            )
        } else {
            return(
                <nav style={{display:'flex', justifyContent:'flex-end', padding:'1em'}}>
                    <p onClick={onLogin} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                    <p onClick={onRegister} className='f3 link dim black underline pa3 pointer'>Register</p>
                </nav>
            )
        }
    
}
export default Navigation;