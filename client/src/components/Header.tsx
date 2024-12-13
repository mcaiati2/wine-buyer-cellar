import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ReactEventHandler } from 'react';
import axios from 'axios';

function Header() {
  const store = useStore();
  const navigate = useNavigate();

  if (!store) {
    throw new Error('Store is not available');
  }

  const {state, setState} = store;

  const logoutUser: ReactEventHandler<HTMLAnchorElement> = async (event) => {
    event.preventDefault();
    
    await axios.get('/auth/logout');

    setState(oldState => ({
      ...oldState,
      user: null
    }));

    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid navbar-style">
        <NavLink className="navbar-brand" to="/">Wine Buyer Cellar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto d-flex align-items-center">
            {state.user && <p className="m-0 pe-4 align-middle">Welcome, {state.user.first_name}</p>}

            <NavLink className="nav-link" to="/">Home</NavLink>

            {state.user ? (
              <>
                <NavLink className="nav-link" to="/shops" end>Your Shops</NavLink>
                <NavLink className="nav-link" to="/shop/create">Create Shop</NavLink>
                <a onClick={logoutUser} className="nav-link" href="/auth/logout">Log Out</a>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to="/login">Sign In</NavLink>
                <NavLink className="nav-link" to="/register">Sign Up</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;