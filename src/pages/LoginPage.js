import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginSignupWrapper } from '../layout/styles';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setDynamicUser } from '../redux/actions';

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault()
    let data={email,password}
    // console.log(data)
    const response = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      body:JSON.stringify(data) ,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token',
      },
    });
    const json = await response.json();
    console.log(json)
    if(json.token){
      localStorage.setItem('authToken', json.token);
      dispatch(setDynamicUser("name",json.name))
      dispatch(setDynamicUser("email",email))
      dispatch(setDynamicUser("userId",json.id))
      // dispatch(setDynamicUser('userId',json._id))
      navigate('/chat-screen')
    }
    else{
      Swal.fire({
        icon: 'error',
        title: json.error,
        // text: 'Something went wrong!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
      
    }
  };


  return (
    <LoginSignupWrapper>
      <div className="login-page">
        <div className="form">
          {/* <form className="register-form">
                        <input type="text" placeholder="name" />
                        <input type="password" placeholder="password" />
                        <input type="text" placeholder="email address" />
                        <button>create</button>
                        <p className="message">
                            Already registered? <Link to="/login">Sign In</Link>
                        </p>
                    </form> */}
          <form onSubmit={(e) => login(e)} className="login-form">
            <input type="text"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)} />
            <input type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)} />
            <button type='submit'>login</button>
            <p className="message">
              Not registered? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </LoginSignupWrapper>
  );
}

export default LoginPage;
