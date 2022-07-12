import React, { useState, useEffect } from 'react';
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
      if (selectedStyle.skus[selectedSku].quantity > 15) {
        setMaxQuantity(15);
        setSelectedQuantity(1);
      } else {
        setMaxQuantity(selectedStyle.skus[selectedSku].quantity);
        setSelectedQuantity(1);
      }
    } else if (selectedSku && selectedSku.length === 0) {
      setSelectedQuantity(null);
      setMaxQuantity(null);
      setClickSubmit(false);
    }
  }, [selectedSku]);

  const clickSubmitWithNoQuantity = () => {
    setClickSubmit(true);
    setSelectedSku(skusInStock[0]);
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
      <form onSubmit={(e) => {
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
        setSelectedSku('');
      }}
      >
        {clickSubmit && (<div>Please select size</div>)}
        <select
          id="size-selector"
          defaultValue={selectedSku}
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
        <select onChange={(e) => { setSelectedQuantity(e.target.value); }}>
          {(selectedSku.length === 0 || (selectedSku.length > 0 && !maxQuantity)) && (<option value="">-</option>)}
          {selectedSku.length > 0 && maxQuantity && (range.map((quantity) => (
            <option value={quantity} key={quantity}>
              {quantity}
            </option>
          )))}
        </select>
        {skusInStock.length > 0 && selectedSku.length === 0
        && (<button type="button" onClick={clickSubmitWithNoQuantity}>Add to Cart</button>)}
        {skusInStock.length > 0
        && selectedSku.length > 0
        && selectedQuantity
        && (
        <button type="submit">Add to Cart</button>
        )}
        {/* {console.log(selectedSku, selectedQuantity, clickSubmit)} */}
      </form>
    );
  }
}

export default Checkout;
