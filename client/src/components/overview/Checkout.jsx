import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Checkout({ selectedStyle }) {
  const [skusInStock, setSkusInStock] = useState([]);
  const [selectedSku, setSelectedSku] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [maxQuantity, setMaxQuantity] = useState(null);

  useEffect(() => {
    if (Object.keys(selectedStyle).length > 0) {
      const inStock = Object.keys(selectedStyle.skus).filter(
        (sku) => (selectedStyle.skus[sku].quantity > 0));
      setSkusInStock(inStock);
    }
  }, [selectedStyle]);

  useEffect(() => {
    if (selectedSku) {
      if (selectedStyle.skus[selectedSku].quantity > 15) {
        setMaxQuantity(15);
      } else {
        setMaxQuantity(selectedStyle.skus[selectedSku].quantity);
      }
    }
  }, [selectedSku]);

  if (Object.keys(selectedStyle).length > 0
    && skusInStock.every((sku) => (Object.keys(selectedStyle.skus).indexOf(sku) !== -1))) {
    let range = [];
    if (maxQuantity !== null && maxQuantity > 0) {
      for (let i = 1; i <= maxQuantity; i += 1) {
        range.push(i);
      }
    }

    return (
      <form>
        <select onChange={(e) => { setSelectedSku(e.target.value); }}>
          {skusInStock.length === 0 && ((<option value="">OUT OF STOCK</option>))}
          {skusInStock.length > 0 && (<option value="">Select Size</option>)}
          {skusInStock.length > 0 && (
            skusInStock.map((sku) => (
              <option value={sku} key={sku}>
                {selectedStyle.skus[sku].size}
              </option>
            )))}
        </select>
        <select onChange={(e) => { setSelectedQuantity(e.target.value); }}>
          {(!selectedSku || (selectedSku && !maxQuantity)) && (<option value="">-</option>)}
          {selectedSku && maxQuantity && (range.map((quantity) => (
            <option value={quantity} key={quantity}>
              {quantity}
            </option>
          )))}
        </select>
        {/* {skusInStock.length > 0 && !selectedSku && } */}
        {skusInStock.length > 0
        && selectedSku
        && selectedQuantity
        && (
        <button
          type="button"
          onClick={() => {
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
          }}
        >
          Add to Cart
        </button>
        )}
      </form>
    );
  }
}

export default Checkout;
