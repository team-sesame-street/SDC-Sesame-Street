/* eslint-disable no-restricted-syntax */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Modals = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFF;
  z-index: 1000;
  cursor: pointer;
  width: 35vw;
  height: min-content;
  padding-top: 7px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .7);
  z-index: 1000;
`;

const textStyle = {
  width: '33.33%',
  textAlign: 'center',
  borderBottom: '0.5px solid gray',
};

function Modal({ open, closeModal, currOutfit, id }) {
  if (!open) return null;

  const [siteIdInfo, setSiteIdInfo] = useState({});
  const [features, setFeatures] = useState({});

  useEffect(() => {
    if (id) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`, {
        headers: {
          Authorization: process.env.GITKEY,
        },
      })
        .then((res) => setSiteIdInfo(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  useEffect(() => {
    if (Object.keys(siteIdInfo).length !== 0) {
      let pageOutfit = {};
      let clickedOutfit = {};
      let seen = {};
      for (const ele of siteIdInfo.features) {
        pageOutfit[ele.feature] = [ele.value];
        seen[ele.feature] = true;
      }
      for (const ele of currOutfit.data.features) {
        if(seen[ele.feature]) {
          clickedOutfit[ele.feature] = [ele.value];
        } else {
          seen[ele.feature] = true;
          clickedOutfit[ele.feature] = [ele.value];
        }
      }
      setFeatures({ main: pageOutfit, clickedOutfit, seen });
    }
  }, [siteIdInfo]);

  return (
    <>
      <Overlay/>
      <Modals onClick={closeModal}>
        <section>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '0.7px solid gray', borderRight: '0.7px solid gray'}}>{siteIdInfo.name}</th>
                <th style={{ borderBottom: '0.7px solid gray'}}>Characteristics</th>
                <th style={{ borderBottom: '0.7px solid gray', borderLeft: '0.7px solid gray'}}>{currOutfit.data.name}</th>
              </tr>
            </thead>
            {Object.keys(features).length !== 0 ? Object.keys(features.seen).map((feature) => (
              <tbody key={Math.random()}>
                <tr>
                  <td style={{...textStyle, borderRight: '0.7px solid gray'}}>{features.main[feature] ? features.main[feature] + ' ✔' : ' '}</td>
                  <td style={textStyle}><b>{feature}</b></td>
                  <td style={{...textStyle, borderLeft: '0.7px solid gray'}}>{features.clickedOutfit[feature] ? features.clickedOutfit[feature] + ' ✔': ' '}</td>
                </tr>
              </tbody>
            )) : <></>}
          </table>
        </section>
      </Modals>
    </>
  );
}

export default Modal;
