/* eslint-disable no-restricted-syntax */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { MdTransitEnterexit } from 'react-icons/md';

const rainbowRoad = keyframes`
  0%    {background-color: red;}
  14%    {background-color: orange;}
  28%    {background-color: yellow;}
  42%    {background-color: green;}
  56%    {background-color: blue;}
  77%    {background-color: indigo;}
  100%    {background-color: purple;}
`

const fadein = keyframes`
  0%    { opacity: 0;}
  20%   { opacity: 0;}
  80%   { opacity: 1;}
  100%  { opacity: 1;}
`

const Modals = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #e8e8e8;
  z-index: 1000;
  width: 600px;
  padding-top: 7px;
  animation: ${fadein} 0.7s ease-in;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4)
`;

const Header = styled.div`
  text-align: center;
  position: relative;
`;

const Button = styled.div`
  cursor: pointer;
  float: right;
  padding-right: 5px;
  padding-bottom: 5px;
`;

const Table = styled.table`
  width: 100%;
  min-height: 30vh;
  max-height: 30vh;
`;

const Th1 = styled.th`
  border-top: 0.7px solid black;
  border-bottom: 0.7px solid black;
  border-right: 0.7px solid black;
`;

const Th2 = styled.th`
  border-top: 0.7px solid black;
  border-bottom: 0.7px solid black;
  border-left: 0.7px solid black;
`;

const textStyle = {
  width: '33.33%',
  textAlign: 'center',
  borderBottom: '0.5px solid black',
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
      const pageOutfit = {};
      const clickedOutfit = {};
      const seen = {};
      for (const ele of siteIdInfo.features) {
        pageOutfit[ele.feature] = [ele.value];
        seen[ele.feature] = true;
      }
      for (const ele of currOutfit.data.features) {
        if (seen[ele.feature]) {
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
      <Overlay />
      <Modals>
        <Header>
          <b>Comparison</b>
          <Button><MdTransitEnterexit size={25} onClick={closeModal} /></Button>
        </Header>
        <section>
          <Table>
            <thead>
              <tr>
                <Th1>{siteIdInfo.name}</Th1>
                <th style={{ borderTop: '0.7px solid black', borderBottom: '0.7px solid black'}}>Characteristics</th>
                <Th2>{currOutfit.data.name}</Th2>
              </tr>
            </thead>
            {Object.keys(features).length !== 0 ? Object.keys(features.seen).map((feature) => (
              <tbody key={Math.random()}>
                <tr>
                  <td style={{...textStyle, borderRight: '0.7px solid black'}}>{features.main[feature] ? features.main[feature] + '  ✔' : ' '}</td>
                  <td style={textStyle}><b>{feature}</b></td>
                  <td style={{...textStyle, borderLeft: '0.7px solid black'}}>{features.clickedOutfit[feature] ? features.clickedOutfit[feature] + '  ✔': ' '}</td>
                </tr>
              </tbody>
            )) : <></>}
          </Table>
        </section>
      </Modals>
    </>
  );
}

export default Modal;
