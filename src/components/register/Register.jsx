import "./register.css";
import Autocomplete from "react-google-autocomplete";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterComponent({setIsLoggedIn}) {
    const navigate = useNavigate();
    const [apiKey] = useState(process.env.REACT_APP_GOOGLE_API_KEY)
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [address, setAddress] = useState('')
    const [coordinates, setCoordinates] = useState({
        lat: null, lng: null,
    })

    const handleClick = async (e) => {
      try {
        e.preventDefault()
        let values = {
          firstName,
          lastName,
          email,
          password,
          address,
          mobile,
          long: coordinates.lng,
          lat: coordinates.lat
        };
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/user/signup`,
          data: values,
        });
        if(response.status === 201) {
          setSuccess('Registration Successful')
          localStorage.setItem('token', response.data.token)
          setIsLoggedIn(true);
          setTimeout(() => {
            navigate('/')
          }, 1500)
        }
      } catch (error) {
        console.log(error.response);
        if(error.response.status == 409) {
          setError(error.response.data.msg)
          
        }
      }
    }

    const getCoordinate = async address => {      
        try{
            setAddress(address)
            const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            let coordinate = result.data.results[0].geometry.location
            setCoordinates(coordinate)
            console.log(result.data.results[0].geometry.location)
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className="form-container">
      <form className="register-form">
       { success && <div className="success-message">{success}</div>}
        <input
          className="form-field"
          type="text"
          onChange={(e) => {
            setError('')
            setFirstName(e.target.value)
          }}
          placeholder="First Name"
          name="firstName"
          value={firstName}
        />
        <input
          className="form-field"
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={(e) => {
            setError('')
            setLastName(e.target.value)
          }}
          value={lastName}
        />
        <input
          className="form-field"
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => {
            setError('')
            setEmail(e.target.value)
          }}
          value={email}
        />
        <input
          className="form-field"
          type="text"
          placeholder="Mobile"
          name="mobile"
          onChange={(e) => {
            setError('')
            setMobile(e.target.value)}}
          value={mobile}
        />
        <input
          className="form-field"
          type="text"
          placeholder="Password"
          name="password"
          onChange={(e) => {
            setError('')
            setPassword(e.target.value)
          }}
          value={password}
        />
        <Autocomplete className="input" placeholder="Address" apiKey={apiKey} onPlaceSelected={(place) => getCoordinate(place.formatted_address)} />
       {error && <span id="email-error">{error}</span>}
        <button className="form-field" onClick={handleClick}>
          Register
        </button>
      </form>
      <p>Already have an account?? Click to <Link to="/signin">Sign in</Link></p>
    </div>
  );
}