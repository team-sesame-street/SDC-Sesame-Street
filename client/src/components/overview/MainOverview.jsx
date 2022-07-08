import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyleSelector from './StyleSelector.jsx';
import ImageDefaultThumbnail from './Img_Default_Thumbnails.jsx';

function MainOverview({id}) {
  const [styles, setStyles] = useState([]);
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
              setSelectedStyle(style);
            }
          });
        })
        .catch((err) => {
          console.log('Client: Unable to retrieve styles for this product');
          console.log(err);
        });
    }
  }, [id]);

  return (
    <div>
      <h1>Overview</h1>
      <StyleSelector
        styles={styles}
        selectedStyleId={selectedStyle.style_id}
        setSelectedStyle={setSelectedStyle}
      />
      <ImageDefaultThumbnail selectedStyle={selectedStyle} />
    </div>
  );
}

export default MainOverview;
