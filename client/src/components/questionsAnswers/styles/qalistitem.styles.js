import styled from 'styled-components';

export const Wrapper = styled.article`
`;

export const QuestionWrap = styled.summary`
  font-size: 1.10rem;
  font-weight: 600;
  border-bottom: 1px solid whitesmoke;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;


  & span::before {
    content: "Q: ";
  }

  & small {
    font-weight: 400;
    font-size: 0.75rem;
    min-width: max-content;

    @media(max-width:500px) {
      align-self: flex-end;
      opacity: 0.35;
    }
  }

  @media(max-width:500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const AnswerWrapper = styled.div`
  max-height: max-content;
  overflow: auto;
  display: flex;
  padding: 10px;
  gap: 5px;

  & .answer_label {
    font-weight: 600;
    font-size: 1.10rem;
    flex-basis: min-content;
  }

  & .answers_list {
    flex: 1;
  }
`;

export const SubActionBtn = styled.button`
  border: none;
  background: none;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
  &[disabled] {
    color: #666;
    text-decoration: none;
    cursor: revert;
  }
`;

export const PrimaryBtn = styled.button`
  text-transform: uppercase;
  font-weight: 700;
  border: none;
  color: #022F6B;
  font-size: 0.85rem;
  padding: 5px 10px;
  margin: 10px 0;
  cursor: pointer;
  border: 1px solid #022F6B;
  border-radius: 4px;
  cursor: pointer;
  transition: all 100ms ease-in-out;
  background-color: white;
  &:hover {
    transition: all 200ms ease-in-out;
    background: #CAF0F8;
  }
  &:active {
      background: #ACE8F4;
    }
`;
