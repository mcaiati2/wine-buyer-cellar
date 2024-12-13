import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Shop } from '../interfaces';

function UserShops() {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    axios.get('/api/shops/user')
      .then(res => {
        setShops(Array.isArray(res.data.shops) ? res.data.shops : []); // Ensure res.data.shops is an array
      })
      .catch(err => {
        console.error(err);
        setShops([]); // Set to an empty array on error
      });
  }, []);

  return (
    <section className="user-shops-container">
      <div className="user-shops-content">
        <h1 className="text-center wine-shops-title">View Your Shops</h1>
        <section className="user-shops-items">
        {!shops.length && <h4 className="ms-4 mt-3 fw-light no-shops-message">You haven't created any shops.</h4>}

          {Array.isArray(shops) && shops.map(shop => (
            <article key={shop.id} className="user-shops-item"> {/* Apply the translucent box class */}
              <h3>{shop.name}</h3>
              <p>Location: {shop.address}</p>
              <div className="d-flex justify-content-start"> {/* Justify content to the start (left) */}
                <NavLink className="btn btn-primary" to={`/shop/${shop.id}`}>View Shop</NavLink>
              </div>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}

export default UserShops;