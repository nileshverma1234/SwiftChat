import React from 'react'
import GenderCheckbox from './GenderCheckbox'

const signUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          SignUp
          <span className='text-blue-500'> SwiftChat</span>
        </h1>

        <form >
          {/* Full Name Div */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name :-</span>
            </label>

            <input 
              type="text"
              placeholder='Full Name'
						  className='w-full input input-bordered h-10'
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
						
					  />

          </div>

          {/* Gender check box */}
          {/* <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} /> */}
          {/* Already have account */}

          {/* Signup Button */}

          <div>
					<button className='btn btn-block btn-sm mt-2' >SignUp</button>
				</div>
        </form>
      </div>
    </div>
  )
}

export default signUp