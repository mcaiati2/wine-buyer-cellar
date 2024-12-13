import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

// I alias the Shop interface so I can use the Shop name
import { Shop as ShopInterface } from '../interfaces';

function Shop() {
  const [shop, setShop] = useState<ShopInterface | null>(null);
  const [message, setMessage] = useState('No wines have been added to this shop.');
  const params = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get(`/api/shop/${params.shop_id}`)
      .then(res => {
        setShop(res.data.shop);
      })
      .catch(() => {
        setMessage('You are not the owner of this shop.');
      });
  }, [params.shop_id]);

  const deleteShop = async () => {
    await axios.delete(`/api/shop/${shop?.id}`);
    
    document.querySelector('.modal-backdrop')?.remove();
    navigate('/shops');
  }

  if (!shop) {
    return <p>Loading...</p>;
  }

  return (
    <section className="container wine-shop-container">
      <h1 className="text-center mt-4">{shop.name}</h1>
      <p className="text-center">{shop.address}</p>
      <div className="d-flex justify-content-center">
        <NavLink to="/wine/add" state={{
            shop_id: shop.id,
            shop_name: shop.name
          }} className="btn btn-primary me-4">Add Wine</NavLink>
        <NavLink to="/shop/edit" state={{
          shop: shop
        }} className="btn btn-warning me-4">Edit Shop</NavLink>
        <button className="btn  btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal">Delete Shop</button>
      </div>

      <h3 className="mb-3 mt-4 fw-light">Wine Listing</h3>
      <hr />

      {Array.isArray(shop.Wines) && shop.Wines.length ? (
        <>
          <div className="row">
            {shop.Wines.map(wine => (
              <article key={wine.id} className="col-3 d-flex flex-column align-items-center">
                <h4 className="fw-lighter text-decoration-underline">{wine.brand}</h4>
                <div>
                  <p>Type: {wine.type}</p>
                  <p>Region: {wine.region}</p>
                  <p>Price: ${wine.price}</p>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <p>{message}</p>
      )}
    
      <div className="modal fade" id="delete-modal" tabIndex={-1} aria-labelledby="delete-modal-label" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="delete-modal-label">Delete Shop</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h4 className="fw-light">Are you sure you want to delete this shop?</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button onClick={deleteShop} type="button" className="btn btn-danger px-3">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Shop;