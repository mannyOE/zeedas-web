import styled from "styled-components";
import { theme } from "../../style";

export const SelectContainer = styled.div`
  display: flex;
  min-width: 100%;
  height: auto;
`;

export const TextArea = styled.div`
  min-width: 100%;
  padding: ${theme.spacing.xSmall} 0;
  max-height: 40px;
  display: flex;
  align-items: center;
`;

export const PlaceHolder = styled.p`
  color: ${theme.colors.gray600} !important;
`;

export const Menu = styled.div`
  display: flex;
  min-width: 231px !important;
  max-height: 200px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  overflow: auto;
  border-radius: ${theme.primaryBorderRadius};
  z-index: 2;
  position: absolute;
  flex-direction: column;
  background-color: ${theme.colors.white};
  top: 42px;
`;

export const MenuItem = styled.div`
  display: flex;
  min-width: 100%;
  min-height: 30px;
  align-items: center;
  padding: 0 ${theme.spacing.xSmall};
  cursor: pointer;
  &:hover {
    padding-left: ${theme.spacing.small};
  }
`;
