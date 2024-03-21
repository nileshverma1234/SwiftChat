import React from 'react'
import GenderCheckbox from './GenderCheckbox';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {

  const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
    email: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

  const {loading, signup} =useSignup();
  const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

  const handleSubmit = async (e)=>{
    e.preventDefault();
    await signup(inputs);
    // console.log(inputs);
  };


  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          SignUp
          <span className='text-blue-500'> SwiftChat</span>
        </h1>

        <form  onSubmit={handleSubmit}>
          {/* Full Name Div */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name :-</span>
            </label>

            <input 
              type="text"
              placeholder='Full Name'
						  className='w-full input input-bordered h-10'
              value={inputs.fullName}
              onChange={(e)=>setInputs({...inputs, fullName: e.target.value})}
            />

          </div>
          
          {/* Username Div */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username :-</span>
            </label>

            <input 
              type="text"
              placeholder='Username'
						  className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e)=>setInputs({...inputs, username: e.target.value})}
            />

          </div>

          {/* Email Div */}

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Email :-</span>
            </label>

            <input 
              type="text"
              placeholder='Email'
						  className='w-full input input-bordered h-10'
              value={inputs.email}
              onChange={(e)=>setInputs({...inputs, email: e.target.value})}
            />

          </div>
          
          {/* Password div */}
          <div>
            <label className='label'>
						  <span className='text-base label-text'>Password :-</span>
					  </label>

            <input
						  type='password'
						  placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e)=>setInputs({...inputs, password: e.target.value})}
					  />

          </div>

          {/* Confirm password Div */}

          <div>
            <label className='label'>
						  <span className='text-base label-text'>Confirm Password :-</span>
					  </label>

            <input
						  type='password'
						  placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputs.confirmPassword}
              onChange={(e)=>setInputs({...inputs, confirmPassword: e.target.value})}
					  />

          </div>

          {/* Gender check box */}

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />


          {/* Image selection part */}
          {/* <div>
            <label className='label'>
						  <span className='text-base label-text'>Upload profile pic :-</span>
					  </label>

          </div> */}
          {/* Already have account */}
          <Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?
					</Link>
          {/* Signup Button */}

          <div>
					  <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
				  </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;