import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';

const initialFormData = {
  brand: '',
  type: '',
  region: '',
  price: 0,
  error_message: ''
}

function WineForm() {
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(oldFormData => ({
      ...oldFormData,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('/api/wine', {
        ...formData,
        shop_id: location.state.shop_id
      });

      navigate(`/shop/${location.state.shop_id}`);
    } catch (error: any) {
      setFormData(oldFormData => ({
        ...oldFormData,
        // This is the property on the formData above
        error_message: error.response.data.message
      }));
    }
  };

  return (
    <section className="row add-wine-page white-font">
      <form onSubmit={handleSubmit} className="col-4 mx-auto mt-5">
        <h2 className="text-center">Add Wine</h2>
        <p className="text-center fst-italic">{location.state.shop_name}</p>

        {formData.error_message && <p className="text-danger text-center">{formData.error_message}</p>}

        <div className="mb-3">
          <label htmlFor="brand-input" className="form-label">Brand</label>
          <input onChange={handleInputChange} name="brand" type="text" className="form-control" id="brand-input" />
        </div>

        <div className="mb-3">
          <label htmlFor="type-input" className="form-label">Type</label>
          <input onChange={handleInputChange} name="type" type="text" className="form-control" id="type-input" />
        </div>

        <div className="mb-3">
          <label htmlFor="region-input" className="form-label">Region</label>
          <input onChange={handleInputChange} name="region" type="text" className="form-control" id="region-input" />
        </div>

        <div className="mb-3">
          <label htmlFor="price-input" className="form-label">Price</label>
          <input onChange={handleInputChange} name="price" type="number" className="form-control" id="price-input" />
        </div>

        <NavLink to={`/shop/${location.state.shop_id}`} type="submit" className="btn btn-secondary me-3">Cancel</NavLink>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </section>
  )
}

export default WineForm;