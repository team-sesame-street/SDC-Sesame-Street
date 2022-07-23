import styled from 'styled-components';

export const Wrapper = styled.div`
  border-bottom: 1px solid whitesmoke;
  padding-bottom: 1rem;

  & small > div{
    @media(max-width:500px) {
        align-self: flex-end;
        opacity: 0.35;
      }
  }

  @media(max-width: 500px) {
    padding-bottom: 1.5rem;
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

export const Thumbnail = styled.img`
  border: 1px solid #222;
  display: inline-block;
  aspect-ratio: 1/1;
  object-fit: cover;
  width: 150px;
  height: 75px;
  margin: 10px 10px 5px 0;
  cursor: pointer;
  transition: all 100ms ease-in-out;

  &:hover {
    transition: all 200ms ease-in-out;
    opacity: 0.9;
  }
`;

export const ThumbnailWrapper = styled.div`
  display: flex;
  @media(max-width:500px) {
    & img {
      flex: 1;
    }
  }
`;
