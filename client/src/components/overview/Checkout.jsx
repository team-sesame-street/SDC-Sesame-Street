import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function Checkout({ selectedStyle }) {
  const [skusInStock, setSkusInStock] = useState([]);
  const [selectedSku, setSelectedSku] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [maxQuantity, setMaxQuantity] = useState(null);
  const [clickSubmit, setClickSubmit] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedStyle).length > 0) {
      const inStock = Object.keys(selectedStyle.skus).filter(
        (sku) => (selectedStyle.skus[sku].quantity > 0));
      setSkusInStock(inStock);
      setSelectedSku('');
      setSelectedQuantity(null);
      setMaxQuantity(null);
      setClickSubmit(false);
    }
  }, [selectedStyle]);

  useEffect(() => {
    if (selectedSku && selectedSku.length > 0) {
      let alreadyInCart = 0;
      axios({
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
        method: 'get',
        headers: {
          Authorization: process.env.GITKEY,
        },
        responseType: 'json',
      })
        .then((response) => {
          const cart = response.data;
          for (let i = 0; i < cart.length; i += 1) {
            if (cart[i].sku_id === Number(selectedSku)) {
              alreadyInCart = Number(cart[i].count);
            }
          }
          const availableToOrder = selectedStyle.skus[selectedSku].quantity - alreadyInCart;
          if (availableToOrder > 15) {
            setMaxQuantity(15);
            setSelectedQuantity(1);
          } else if (availableToOrder > 0) {
            setMaxQuantity(availableToOrder);
            setSelectedQuantity(1);
          } else {
            setMaxQuantity(0);
          }
        });
    } else if (selectedSku.length === 0) {
      setSelectedQuantity(null);
      setMaxQuantity(null);
      setClickSubmit(false);
    }
  }, [selectedSku]);

  const clickSubmitWithNoQuantity = () => {
    setClickSubmit(true);
    setSelectedSku(skusInStock[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setClickSubmit(false);
    let count = selectedQuantity;
    while (count > 0) {
      count -= 1;
      axios({
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
        method: 'post',
        headers: {
          Authorization: process.env.GITKEY,
        },
        data: {
          "sku_id": selectedSku,
        },
      });
    }
    e.target.reset();
    setSelectedSku('');
  };

  if (Object.keys(selectedStyle).length > 0
    && skusInStock.every((sku) => (Object.keys(selectedStyle.skus).indexOf(sku) !== -1))) {
    let range = [];
    if (maxQuantity !== null && maxQuantity > 0) {
      for (let i = 1; i <= maxQuantity; i += 1) {
        range.push(i);
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        {clickSubmit && (<div>Please select size</div>)}
        <select
          defaultValue={selectedSku === '' ? 'Select Size' : selectedSku}
          size={clickSubmit && skusInStock.length > 0 ? 3 : 0}
          onChange={(e) => { setSelectedSku(e.target.value); }}
        >
          {skusInStock.length === 0 && ((<option value="">OUT OF STOCK</option>))}
          {(!clickSubmit && skusInStock.length > 0) && (<option value="">Select Size</option>)}
          {skusInStock.length > 0 && (
            skusInStock.map((sku) => (
              <option value={sku} key={sku}>
                {selectedStyle.skus[sku].size}
              </option>
            )))}
        </select>
        {skusInStock.length > 0 && (
          <select onChange={(e) => { setSelectedQuantity(e.target.value); }}>
            {(selectedSku.length === 0 || (selectedSku.length > 0 && maxQuantity === null)) && (<option value="">-</option>)}
            {maxQuantity === 0 && (<option value={0}>Out Of Stock</option>)}
            {selectedSku.length > 0 && maxQuantity && (range.map((quantity) => (
              <option value={quantity} key={quantity}>
                {quantity}
              </option>
            )))}
          </select>
        )}
        {skusInStock.length > 0 && selectedSku.length === 0
        && (<button type="button" onClick={clickSubmitWithNoQuantity}>Add to Cart</button>)}
        {skusInStock.length > 0
        && selectedSku.length > 0
        && selectedQuantity
        && maxQuantity > 0
        && (<button type="submit">Add to Cart</button>)}
      </form>
    );
  }
}

Checkout.propTypes = {
  selectedStyle: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.shape({
      thumbnail_url: PropTypes.string,
      url: PropTypes.string,
    })),
    skus: PropTypes.objectOf(PropTypes.shape({
      quantity: PropTypes.number,
      size: PropTypes.oneOf(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
    })),
  }),
};

Checkout.defaultProps = {
  selectedStyle: PropTypes.object,
};

export default Checkout;
