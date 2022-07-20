import styled from 'styled-components';

export const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  & button {
    height: 3rem;
    padding: 0 1rem;
    justify-content: flex-start;
    text-transform: uppercase;
    font-weight: 700;
    background: none;
    border: 1px solid #222;
    border-radius: 4px;
    margin-right: 10px;
    margin-top: 15px;
    cursor: pointer;
    transition: all 100ms ease-in-out;

    &:hover {
      color: #eee;
      background: #222;
      transition: all 200ms ease-in-out;
    }
    &:active {
      background: #444;
    }

    &:disabled {
      background: grey;
      color: white;
      opacity: 0.25;
    }

    @media(max-width: 500px) {
      flex: 1;
      padding: 0;
      height: 5rem;
    }
  }
`;