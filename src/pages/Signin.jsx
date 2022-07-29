import React from 'react'
import SigninComponent from '../components/signin/Signin'

function Signin({setIsLoggedIn}) {
  return (
    <SigninComponent setIsLoggedIn={setIsLoggedIn} />
  )
}

export default Signin