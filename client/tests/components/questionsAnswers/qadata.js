export const questions = [
  {
    question_id: 573569,
    question_body: 'Question 3',
    question_date: '2022-02-23T00:00:00.000Z',
    asker_name: 'Joe',
    question_helpfulness: 9,
    reported: false,
    answers: {
      5360905: {
        id: 5360905,
        body: 'aaaaaaaaaaa',
        date: '2022-02-23T00:00:00.000Z',
        answerer_name: 'Joe',
        helpfulness: 0,
        photos: [],
      },
      5985371: {
        id: 5985371,
        body: 'fdfaf',
        date: '2022-05-23T00:00:00.000Z',
        answerer_name: 'dfdf',
        helpfulness: 1,
        photos: [],
      },
      5985372: {
        id: 5985372,
        body: '2345',
        date: '2022-05-23T00:00:00.000Z',
        answerer_name: 'dfdf',
        helpfulness: 3,
        photos: [],
      },
    },
  },
  {
    question_id: 640874,
    question_body: 'I wonder how long can it last',
    question_date: '2022-05-23T00:00:00.000Z',
    asker_name: 'ajfdj456',
    question_helpfulness: 3,
    reported: false,
    answers: {
      5985366: {
        id: 5985366,
        body: 'It lasts forever',
        date: '2022-05-23T00:00:00.000Z',
        answerer_name: 'hahhh44',
        helpfulness: 0,
        photos: [],
      },
      5985367: {
        id: 5985367,
        body: "don't know",
        date: '2022-05-23T00:00:00.000Z',
        answerer_name: '1234rrr',
        helpfulness: 0,
        photos: [],
      },
      5985368: {
        id: 5985368,
        body: 'not long enough',
        date: '2022-05-23T00:00:00.000Z',
        answerer_name: 'mammdnd',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 640880,
    question_body: 'Do you like it',
    question_date: '2022-05-23T00:00:00.000Z',
    asker_name: 'adf6737',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5985369: {
        id: 5985369,
        body: 'noooo',
        date: '2022-05-23T00:00:00.000Z',
        answerer_name: 'mammdnd',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 640875,
    question_body: 'erer',
    question_date: '2022-05-23T00:00:00.000Z',
    asker_name: 'fdf',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
];

export const productMetadata = {
  product_id: 40349,
  productName: 'Pumped Up Kicks',
};

export let checks = {};
export const setChecks = function (obj) {
  checks = obj;
};

setChecks({
  isLoading: true,
  isDone: false,
  isQuestionModalOpen: false,
});

export let searchTerm = 'abc123';

export const setSearchTerm = function (term) {
  searchTerm = term;
};
