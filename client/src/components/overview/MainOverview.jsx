import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyleSelector from './StyleSelector.jsx';
import ImageDefaultThumbnail from './Img_Default_Thumbnails.jsx';

function MainOverview({id}) {
  const [styles, setStyles] = useState([]);
  const [selectedStyleId, setSelectedStyleId] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState({});

  useEffect(() => {
    if (id) {
      axios({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
        method: 'get',
        headers: {
          Authorization: process.env.GITKEY,
          responseType: 'json',
        },
      })
        .then((response) => {
          const stylesData = response.data.results;
          setStyles(stylesData);
          stylesData.forEach((style) => {
            if (style['default?']) {
              setSelectedStyleId(style.style_id);
            }
          });
        })
        .catch((err) => {
          console.log('Client: Unable to retrieve styles for this product');
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    styles.forEach((style) => {
      if (style.style_id === selectedStyleId) {
        setSelectedStyle(style);
      }
    });
  }, [selectedStyleId]);

  return (
    <div>
      <h1>Overview</h1>
      <StyleSelector
        styles={styles}
        selectedStyleId={selectedStyleId}
        setSelectedStyleId={setSelectedStyleId}
      />
      <ImageDefaultThumbnail selectedStyle={selectedStyle} />
    </div>
  );
}

export default MainOverview;
