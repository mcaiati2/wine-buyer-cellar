import { useEffect } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import { useStore } from './store';

import Header from './components/Header';

import Landing from './pages/Landing';
import UserShops from './pages/UserShops';
import ShopForm from './pages/ShopForm';
import Shop from './pages/Shop';
import WineForm from './pages/WineForm';
import AuthForm from './pages/AuthForm';
import NotFound from './pages/NotFound';

function App() {
  const store = useStore();

  if (!store) {
    throw new Error("Store is not available");
  }
  
  const { state } = store;
  const location = useLocation();

  // Create an object of page titles to use for the browser tab
  const titles: {[key: string]: string} = {
    '/': 'Wine Buyer Cellar - Home',
    '/register': 'Wine Buyer Cellar - Register',
    '/login': 'Wine Buyer Cellar - Log In',
    '/shops': 'Wine Buyer Cellar - View Shops',
    '/shop/create': 'Wine Buyer Cellar - Create Shop',
    '/shop/edit': 'Wine Buyer Cellar - Edit Shop',
    '/wine/add': 'Wine Buyer Cellar - Add Wine',
  };

  const getTitle = (path: string): string => {
    if (path.startsWith('/shop/')) {
      const route = path.split('/shop/')[1];
      if (!isNaN(Number(route))) {
        return `Wine Buyer Cellar - View Shop ${route}`;
      } else {
        return `Wine Buyer Cellar - ${route[0].toUpperCase()}${route.slice(1)} Shop`
      }
    }
    return titles[path] || 'Page Not Found';
  };

  useEffect(() => {
    // Grab the corresponding title based on the current route - what comes after localhost:5173
    const title = getTitle(location.pathname);

    // Set the browser tab title when the location of the browser changes
    document.title = title || 'Page Not Found';
  }, [location]);

  return (
    <>
      {state.loading && (
        <>
          <div className="loading d-flex justify-content-center align-items-center">
            <h2>Pouring ...</h2>
          </div>
        </>
      )}

      <Header />

      <main >
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* 
            These are conditional routes that will only load based on the state.user property being truthy or falsey 
            I'm using a ternary expression - CONDITION ? IF TRUTHY : IF NOT TRUTHY
          */}
          {state.user ? (
            <>
              <Route path="/shop/create" element={<ShopForm />} />
              <Route path="/shop/edit" element={<ShopForm />} />
              <Route path="/shops" element={<UserShops />} />
              <Route path="/shop/:shop_id" element={<Shop />} />
              <Route path="/wine/add" element={<WineForm />} />             
            </>
          ) : (
            <>
              <Route path="/register" element={<AuthForm isLogin={false} />} />
              <Route path="/login" element={<AuthForm isLogin={true} />} />
            </>
          )}

          {/* Fallback route that shows a not found page if they visit a path that does not have a route above and/or they visit a user route and the state user property is null */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
