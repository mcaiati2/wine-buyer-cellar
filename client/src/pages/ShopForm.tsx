import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const initialFormData = {
  name: '',
  address: '',
  error_message: '',
  isEdit: false
}

function ShopForm() {
  const [formData, setFormData] = useState(initialFormData); 
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      console.log(state);
      setFormData({
        name: state.shop.name,
        address: state.shop.address,
        isEdit: true,
        error_message: ''
      });
    }
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(oldFormData => ({
      ...oldFormData,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const method = state ? axios.put : axios.post;

    try {
      await method(`/api/shop${state ? `?shop_id=${state.shop.id}` : ''}`, formData);

      navigate('/shops');
    } catch (error: any) {
      setFormData(oldFormData => ({
        ...oldFormData,
        // This is the property on the formData above
        error_message: error.response.data.message
      }));
    }
  };

  return (
    <section className="row wine-shops-container">
      <form onSubmit={handleSubmit} className="col-4 mx-auto mt-5">
        <h1 className="text-center">{state ? 'Edit' : 'Create'} Shop</h1>

        {formData.error_message && <p className="text-danger text-center">{formData.error_message}</p>}

        <div className="mb-3">
          <label htmlFor="name-input" className="form-label">Name</label>
          <input onChange={handleInputChange} value={formData.name} name="name" type="text" className="form-control" id="input" />
        </div>

        <div className="mb-3">
          <label htmlFor="address-input" className="form-label">Address</label>
          <input onChange={handleInputChange} value={formData.address} name="address" type="text" className="form-control" id="address-input" />
        </div>

        <NavLink to={`${state ? `/shop/${state.shop.id}` : '/shops'}`} type="submit" className="btn btn-secondary me-3">Cancel</NavLink>
        <button type="submit" className="btn btn-primary">{state ? 'Save' : 'Submit'}</button>
      </form>
    </section>
  )
}

export default ShopForm;