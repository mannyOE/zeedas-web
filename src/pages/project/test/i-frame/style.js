import styled, { css } from "styled-components";
import { theme } from "../../style";
import { Button } from "reactstrap";

export const Body = styled.div`
  width: 100%;
  display: flex;
  height: calc(100vh - 76px);
`;

export const IFrameContainer = styled.div`
  width: 100%;
  display: flex;
  height: calc(100vh - 76px);
  iframe {
    width: 100%;
    height: 100%;
  }
`;

export const TestCasesContainer = styled.div`
  width: 550px;
  height: calc(100vh - 76px);
  display: none;
  flex-direction: column;
  background-color: ${theme.colors.gray100};
  ${(props) =>
    props.show &&
    css`
      display: flex;
    `}
`;

export const ListBodyCentered = styled.div``;

export const ListBody = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  overflow-y: auto;
  flex-direction: column;
  padding: ${theme.spacing.xxSmall} 0;
  ${({ center }) =>
    center &&
    css`
      padding: 0;
      align-items: center;
      justify-content: center;
    `}
`;

export const ImprovementButton = styled(Button).attrs(() => ({
  size: "md",
}))`
  border-radius: ${theme.primaryBorderRadius};
  border: 1px solid ${theme.colors.blue100};
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue100}D9;
  width: 150px;
  margin: ${theme.spacing.large} ${theme.spacing.medium};
`;
