import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useStore } from '../store';

const initialFormData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  age: '',
  error_message: ''
}

function AuthForm(propsObj: {isLogin: boolean}) {
  const [formData, setFormData] = useState(initialFormData); 
  const navigate = useNavigate();
  const store = useStore();

  if (!store) {
    throw new Error("Store is not available");
  }

  const { setState } = store;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = propsObj.isLogin ? '/auth/login' : '/auth/register';

    try {
      const res = await axios.post(url, formData)

      if (res.status === 200) {
        setState(oldState => ({
          ...oldState,
          user: res.data.user
        }));
        
        navigate('/');
      } 
    } catch (error: any) {
    
      setFormData(oldFormData => ({
        ...oldFormData,
        // This is the property on the formData above
        error_message: error.response.data.message
      }));
    }

  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(oldFormData => ({
      ...oldFormData,
      [event.target.name]: event.target.value
    }));
  }

  return (
    <section className="row auth-page">
      <form onSubmit={handleSubmit} className="col-4 mx-auto">
        <h2 className="text-center">{propsObj.isLogin ? 'Sign In' : 'Sign Up'}</h2>

        {formData.error_message && <p className="text-danger text-center">{formData.error_message}</p>}

        {!propsObj.isLogin && (
          <>
            <div className="mb-3">
              <label htmlFor="first-name-input" className="form-label">First Name</label>
              <input onChange={handleInputChange} value={formData.first_name} name="first_name" type="text" className="form-control" id="first-name-input" required />
            </div>

            <div className="mb-3">
              <label htmlFor="last-name-input" className="form-label">Last Name</label>
              <input onChange={handleInputChange} value={formData.last_name} name="last_name" type="text" className="form-control" id="last-name-input" required />
            </div>
          </>
        )}

        <div className="mb-3">
          <label htmlFor="email-input" className="form-label">Email Address</label>
          <input onChange={handleInputChange} value={formData.email} name="email" type="email" className="form-control" id="email-input" aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password-input" className="form-label">Password</label>
          <input onChange={handleInputChange} value={formData.password} name="password" type="password" className="form-control" id="password-input" autoComplete="on" required />
        </div>
        
        {!propsObj.isLogin && (
          <div className="mb-3">
            <label htmlFor="age-input" className="form-label">Age</label>
            <input onChange={handleInputChange} value={formData.age} name="age" type="number" className="form-control" id="age-input" required />
          </div>
        )}

        <div className="d-grid">
          <button type="submit" className="btn btn-primary full-width">Submit</button>

          {propsObj.isLogin ? (
            <NavLink className="text-center mt-3" to="/register">Haven't signed up? Click Here!</NavLink>
          ) : (
            <NavLink className="text-center mt-3" to="/login">Already signed up? Click Here!</NavLink>
          )}
        </div>        

      </form>
    </section>
  )
}

export default AuthForm;