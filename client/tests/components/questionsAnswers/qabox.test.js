// import React from 'react';

// import { render, cleanup } from '@testing-library/react';
// import { fireEvent, toBeInTheDocument } from '@testing-library/jest-dom';
// import QaBox from '../../../src/components/questionsAnswers/QaBox.jsx';

// const currProduct = {
//   id: 40344,
//   campus: "hr-rfp",
//   name: "Camo Onesie",
//   slogan: "Blend in to your crowd",
//   description: "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
//   category: "Jackets",
//   default_price: "140.00",
//   created_at: "2021-08-13T14:38:44.509Z",
//   updated_at: "2021-08-13T14:38:44.509Z",
//   features: [
//     {
//       feature: "Fabric",
//       value: "Canvas"
//     },
//     {
//       feature: "Buttons",
//       value: "Brass"
//     }
//   ]
// };

// afterEach(() => {
//   cleanup();
// });

// test('This should render the Question and Answer component', () => {
//   const { getByTestId } = render(<QaBox currProduct={currProduct} />);
//   const el = getByTestId('qa-component');
//   expect(el).toBeInTheDocument();
// });

// test('This should render the Add questions button component', () => {
//   const { getByTestId } = render(<QaBox currProduct={currProduct} />);
//   const el = getByTestId('qa-addqbtn');
//   expect(el).toBeInTheDocument();
// });

// test('This should fire the Add questions button component', () => {
//   const { getByTestId } = render(<QaBox currProduct={currProduct} />);
//   const el = getByTestId('qa-addqbtn');
//   fireEvent.click(el);

//   expect(el).toHaveBeenCalled();
// });
