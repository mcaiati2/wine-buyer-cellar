import { NavLink } from 'react-router-dom';
import { useStore } from '../store';

function Landing() {
  const store = useStore();

  if (!store) {
    throw new Error("Store is not available");
  }

  const { state } = store;

  return (
    <section className="landing-page">
      <h1 className="landing-header">Wine Buyer Cellar</h1>
      <p className="landing-subheader"><i>Your Personal Wine Inventory Assistant</i></p>
      <NavLink
        to={state.user ? '/shops' : '/register'}
        className="btn btn-primary btn-lg px-5">
        {state.user ? 'View Your Shops!' : 'Start Now!'}
      </NavLink>
    </section>
  )
}

export default Landing;