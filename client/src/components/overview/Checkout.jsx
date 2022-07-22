import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import AddToCartButton from '../../../utils/AddToCartButton.jsx';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

function Checkout({ selectedStyle }) {
  const [skusInStock, setSkusInStock] = useState([]);
  const [selectedSku, setSelectedSku] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [maxQuantity, setMaxQuantity] = useState(null);
  const [invalidSubmit, setInvalidSubmit] = useState(false);
  const [selectingSize, setSelectingSize] = useState(false);
  const [selectingQuantity, setSelectingQuantity] = useState(false);

  useLayoutEffect(() => {
    if (Object.keys(selectedStyle).length > 0) {
      const inStock = Object.keys(selectedStyle.skus).filter(
        (sku) => (selectedStyle.skus[sku].quantity > 0),
      );
      setSkusInStock(inStock);
      setSelectedSku(null);
      setSelectedQuantity(null);
      setMaxQuantity(null);
      setInvalidSubmit(false);
      setSelectingSize(false);
      setSelectingQuantity(false);
    }
  }, [selectedStyle]);

  useEffect(() => {
    if (Object.keys(selectedStyle).length > 0 && selectedSku) {
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
          if (selectedStyle.skus[selectedSku]) {
            const availableToOrder = selectedStyle.skus[selectedSku].quantity - alreadyInCart;
            if (availableToOrder > 15) {
              setMaxQuantity(15);
              setSelectedQuantity(1);
            } else if (availableToOrder > 0) {
              setMaxQuantity(availableToOrder);
              setSelectedQuantity(1);
            } else {
              setMaxQuantity(0);
              setSelectedQuantity(0);
            }
          }
        });
    } else if (selectedSku === null) {
      setSelectedQuantity(null);
    }
  }, [selectedSku]);

  const addToCart = () => {
    if (!selectedSku) {
      setInvalidSubmit(true);
    } else {
      setInvalidSubmit(false);
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
            sku_id: selectedSku,
          },
        });
      }
    }
    setSelectedSku(null);
  };

  const expandSelectSize = () => {
    setSelectingSize(true);
    if (selectingQuantity) {
      setSelectingQuantity(false);
    }
  };

  const resetSelectedSize = () => {
    setSelectedSku(null);
    setSelectingSize(false);
    setMaxQuantity(null);
    // if (invalidSubmit) {
    //   setInvalidSubmit(false);
    // figure out when would be a good time for this message to disappear
    // }
  };

  const expandSelectQuantity = () => {
    setSelectingQuantity(true);
    if (selectingSize) {
      setSelectingSize(false);
    }
  };

  const handleSelectSize = (e) => {
    setInvalidSubmit(false);
    skusInStock.forEach((sku) => {
      if (selectedStyle.skus[sku].size === e.target.innerText) {
        setSelectedSku(sku);
        setSelectingSize(false);
        if (maxQuantity > 0) {
          setSelectedQuantity(1);
        } else {
          setSelectedQuantity(0);
        }
      }
    });
  };

  const handleSelectQuantity = (e) => {
    setSelectedQuantity(Number(e.target.innerText));
    setSelectingQuantity(false);
  };

  if (Object.keys(selectedStyle).length > 0
    && skusInStock.every((sku) => (Object.keys(selectedStyle.skus).indexOf(sku) !== -1))) {
    const quantityRange = [];
    if (maxQuantity !== null && maxQuantity > 0) {
      for (let i = 1; i <= maxQuantity; i += 1) {
        quantityRange.push(i);
      }
    }

    return (
      <Wrapper>
        <TextWrapper style={{ visibility: invalidSubmit ? 'visible' : 'hidden' }}>
          <p>‼️ Please select size ‼️</p>
        </TextWrapper>
        <SizeSelector>
          {/* collapsed view */}
          {skusInStock.length > 0 && !selectedSku && !selectingSize && (
            <li>
              <button type="button" onClick={expandSelectSize}>
                Select Size
                &nbsp;
                <RiArrowDownSFill
                  style={{
                    gridColumn: '5 / 6',
                    alignSelf: 'center',
                    // justifySelf: 'end',
                  }}
                />
              </button>
            </li>
          )}
          {skusInStock.length > 0 && selectedSku && !selectingSize && (
            <li>
              <button type="button" onClick={expandSelectSize}>
                {selectedStyle.skus[selectedSku].size}
                &nbsp;
                <RiArrowDownSFill
                  style={{
                    gridColumn: '5 / 6',
                    alignSelf: 'center',
                    justifySelf: 'end',
                  }}
                />
              </button>
            </li>
          )}
          {skusInStock.length === 0 && (
            <li>
              <button type="button">OUT OF STOCK</button>
            </li>
          )}

          {/* expanded view */}
          {skusInStock.length > 0 && selectingSize && (
            <li>
              <button type="button" onClick={resetSelectedSize}>
                Select Size
                &nbsp;
                <RiArrowUpSFill
                  style={{
                    gridColumn: '5 / 6',
                    alignSelf: 'center',
                    justifySelf: 'end',
                  }}
                />
              </button>
            </li>
          )}
          {skusInStock.length > 0 && selectingSize && skusInStock.map((sku) => (
            <li key={sku}>
              <button type="button" className="options" onClick={handleSelectSize}>{selectedStyle.skus[sku].size}</button>
            </li>
          ))}
        </SizeSelector>

        <QuantitySelector>
          {/* collapsed view */}
          {maxQuantity === 0 && (
            <li>
              <button type="button">OUT OF STOCK</button>
            </li>
          )}
          {!selectedSku && (
            <li>
              <button type="button" onClick={expandSelectQuantity}>-</button>
            </li>
          )}
          {selectedSku && maxQuantity > 0 && selectedQuantity && !selectingQuantity && (
            <li>
              <button type="button" onClick={expandSelectQuantity}>{selectedQuantity}</button>
            </li>
          )}

          {/* expanded view */}
          {selectingQuantity && maxQuantity > 0 && (
            quantityRange.map((quantity) => (
              <li key={quantity}>
                <button type="button" className="options" onClick={handleSelectQuantity}>{quantity}</button>
              </li>
            ))
          )}
        </QuantitySelector>

        <AddToCartButton
          className="cart-btn"
          style={{
            visibility: skusInStock.length === 0 ? 'hidden' : 'visible',
            gridColumn: '1 / 3',
            gridRow: '3 / 4',
            justifySelf: 'center',
            margin: 0,
            padding: 0,
            width: '80%',
            background: 'black',
            color: 'white',
          }}
          type="button"
          onClick={addToCart}
        >
          Add to Cart
        </AddToCartButton>
      </Wrapper>
    );
  }
  return null;
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
      size: PropTypes.string,
    })),
  }),
};

Checkout.defaultProps = {
  selectedStyle: PropTypes.object,
};

export default Checkout;

const Wrapper = styled.div`
  align-self: start;
  width: inherit;
  height: inherit;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content 70px max-content;
  justify-items: left;
  align-content: center;;
  column-gap: 5px;
  position: relative;
  isolation: isolate;
`;

const TextWrapper = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  align-self: end;
`;

const SizeSelector = styled.ul`
  list-style-type: none;
  position: absolute;
  z-index: 100;
  height: min-content;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  align-self: top;
  width: 100%;
  padding: 0;
  margin: 0;
  // overflow-y: scroll;
  & li {
    height: 30px;
  }
  & button {
    top: 0;
    left: 0;
    border: none;
    width: 100%;
    height: 2rem;
    cursor: pointer;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    justify-content: center;
    align-content: center;
    align-items: center;
    background: #D6CCC2;
  }
  & .options {
    &:hover {
      background: #D5BDAF;
    }
`;

const QuantitySelector = styled.ul`
  list-style-type: none;
  position: absolute;
  z-index: 100;
  height: min-content;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  align-self: top;
  width: 100%;
  padding: 0;
  margin: 0;
  // overflow-y: scroll;
  & li {
    height: 30px;
  }
  & button {
    border: none;
    width: 100%;
    height: 2rem;
    cursor: pointer;
    background: #D6CCC2;
    align-content: center;
    align-items: center;
  }
  & .options {
    &:hover {
      background: #D5BDAF;
    }
`;
