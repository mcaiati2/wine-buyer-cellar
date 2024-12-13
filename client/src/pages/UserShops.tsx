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
        <h1 className="text-center">View Your Shops</h1>
        <section className="row">
          {!shops.length && <h4 className="ms-4 mt-3 fw-light">You haven't created any shops.</h4>}

          {Array.isArray(shops) && shops.map(shop => (
            <article key={shop.id} className="col-4 d-flex flex-column align-items-center">
              <h3>{shop.name}</h3>
              <p>Location: {shop.address}</p>
              <div className="d-flex justify-content-center">
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