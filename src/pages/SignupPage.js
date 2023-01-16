import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginSignupWrapper } from '../layout/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setDynamicUser } from '../redux/actions';

function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null)

  const signup = async (e) => {
    e.preventDefault()
    // let data = {
    //   name: userName,
    //   email,
    //   password,
    //   image : image && JSON.stringify(image)
    // }
    let data = new FormData();
    data.append('name', userName);
    data.append('email', email);
    data.append('password', password);
    data.append('image', image);
    console.log('dataa',data._boundary)

    // console.log(data)
    // const boundary = data.getBoundary()

    const response = await fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      body: data,
      // headers: {
      //   'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      //   // 'Authorization': 'Bearer token',
      // },
    });
    const json = await response.json();
    console.log(json)
    if (json.token) {
      localStorage.setItem('authToken', json.token);
      dispatch(setDynamicUser("name", userName))
      dispatch(setDynamicUser("email", email))
      dispatch(setDynamicUser("userId", json.id))
      navigate('/chat-screen')
    }
    else {
      Swal.fire({
        icon: 'error',
        title: json.error,
        // text: 'Something went wrong!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })

    }
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    console.log(image,'image')
    setImage(image)
    // uploadImageToCloudStorage(image, 'my-bucket')
    //   .then((imageUrl) => {
    //     console.log(imageUrl);
    //     // The image has been uploaded to Google Cloud Storage, you can now save the image URL in your database
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };



  return (
    <LoginSignupWrapper>
      <div className="login-page">
        <div className="form">
          <form onSubmit={(e) => { signup(e) }} className="signup-form">
            <input
              type="text"
              placeholder="name"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <input
              type="file"
              onChange={handleImageChange}
              id="image" 
              name="image"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="text"
              placeholder="email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type='submit'>sign up</button>
            <p className="message">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </LoginSignupWrapper>
  );
}

export default SignupPage;
