import styled, { css } from "styled-components";
import { theme } from "../../style";

const {
  spacing, colors, fontSize, primaryBorderRadius,
} = theme;

export const List = styled.div`
  margin: ${spacing.large} ${spacing.xSmall};
  padding: ${spacing.xSmall};
  max-width: 272px;
  min-width: 230px;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: stretch;
  overflow-y: auto;
  height: auto;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  line-height: 24px;
  font-size: ${fontSize.fontSize};
  font-weight: 700;
  margin: 0;
  text-transform: capitalize;
  background-color: transparent;
`;

export const ListBody = styled.div`
  align-self: stretch;
  flex-direction: column;
  display: flex;
  overflow-y: auto;
  border-radius: 5px;
  flex: 1;
  ${(props) => props.empty && css`
  background-image: linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0)); 
`}
`;

export const AddCard = styled.div`
  border-radius: 5px;
  width: 100%;
  box-shadow: 0px 4px 15px rgba(161, 161, 161, 0.1);
  display: flex;
  flex: 0;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  background-color: #F9F9F9;
  cursor: pointer;
  margin-bottom: 0.5rem;
`;

export const ListHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-self: flex-start;
  color: ${colors.black};
  align-items: flex-end;
  justify-content: space-between;
  h3 {
    font-weight: 700;
    margin: 0;
  }
`;
