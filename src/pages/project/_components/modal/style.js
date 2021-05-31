import styled from "styled-components";
import { theme } from "../../style";

const { colors, spacing } = theme;

export const Overlay = styled.div`

`;

export const Content = styled.div`
  position: absolute;
  background-color: ${colors.white};
  height: 100vh;
  display: flex;
  flex: 1;
  width: 44%;
  right: 0;
`;

export const CloseButton = styled.p`
  position: absolute;
  top: 32px;
  left: -10rem;
  margin: 0 !important;
  padding: 0 !important;
  span {
    margin: 0 ${spacing.xxSmall};
  }
`;
