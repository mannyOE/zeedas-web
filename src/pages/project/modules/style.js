import styled from "styled-components";
import { Button as ReactButton } from "reactstrap";
import { theme } from "../style";

const { colors, fontSize, spacing } = theme;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // TODO: Investigate effect of style switch
  //min-height: 100%;
  min-height: max-content;
  flex: 1;
`;

export const EmptyContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color ${colors.gray100};
  justify-content: center;
  & svg {
   margin-bottom: ${spacing.xLarge};
  }
  p {
    color: ${colors.black};
    font-size: ${fontSize.fontSizeXl};
    font-weight: 800;
    margin: 0;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  width: 100%;
  min-height: 300px;
  padding: ${spacing.xLarge};
  flex-direction: column;
  border-radius: 15px;
  background-color: ${colors.white};
  h4 {
    margin: ${spacing.small} 0;
    color: ${colors.black};
  }
  p {
    margin: ${spacing.small} 0;
  }
  div {
    margin-top: ${spacing.large}
  }
`;

export const Button = styled(ReactButton).attrs(() => ({
  size: "lg",
}))`
  border: 1px solid ${colors.$zdBlue};
  background-color: ${colors.$zdBlue}1F;
  color:  ${colors.$zdBlue};
  min-width: 100px;
  margin-right: ${spacing.medium};
`;

export const DeleteButton = styled(Button)`
  background-color: ${colors.$zdRed};
  border: 1px solid ${colors.$zdRed};
  color:  ${colors.white};
  display: inline-flex;
  flex: 0;
  align-items: center;
  svg {
    margin-right: ${spacing.xxSmall}
  }
`;
