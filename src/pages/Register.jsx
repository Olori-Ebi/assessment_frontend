import React from 'react'
import RegisterComponent from '../components/register/Register'

function Register({setIsLoggedIn}) {
  return (
    <>
        <RegisterComponent setIsLoggedIn={setIsLoggedIn} />
    </>
  )
}

export default Register