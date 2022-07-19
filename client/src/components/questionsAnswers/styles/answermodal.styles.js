import styled from 'styled-components';

export const FileInputWrapper = styled.label`
  background-color: #ddd;
  padding: 5px 10px;
  & input {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
  }
  & #file-input-label {
    display: inline-block;
    padding: 5px 10px;
    background: #ddd;
  }
  & #file-input-label:hover {
    background: #ccc;
  }

  & small {
    font-style: italic;
  }
`;

export const ThumbnailWrapper = styled.div`
  margin: 1rem 0;
  width: 100%;
  padding:  0;
  height: min-content;
  min-height: 100px;
  max-height: 130px;
outline: 1px solid #ddd;
`;

export const Thumbnail = styled.img`
  display: inline-block;
  aspect-ratio: 1/1;
  object-fit: cover;
  width: ${100 / 5}%;
  height: 100px;
  padding: 5px;
`;

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
      transition: all 200ms ease-in-out;
      color: #eee;
      background: #222;
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