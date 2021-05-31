import styled, { css } from "styled-components";

export const theme = {
  spacing: {
    xxSmall: "4px",
    xSmall: "8px",
    small: "12px",
    medium: "16px",
    large: "24px",
    xLarge: "48px",
    xxLarge: "64px",
  },
  fontSize: {
    fontSize: "0.9375rem",
    fontSizeXS: "0.65rem",
    fontSizeS: "0.8rem",
    fontSizeL: "1.2rem",
    fontSizeXl: "1.5rem",
    fontSizeXxl: "2rem",
    fontSizeXxxl: "2.5rem",
    fontSizeXxxxl: "3rem",
  },
  colors: {
    gray100: "#fbfbfb",
    gray200: "#ebebeb",
    gray300: "#dee2e6",
    gray400: "#ced4da",
    gray500: "#adb5bd",
    gray600: "#999",
    gray700: "#444",
    gray800: "#303030",
    gray900: "#222222",
    gray1000: "#1f1f1f",
    white: "#ffffff",
    green: "#00bc8c",
    green100: "#4DBD98",
    blue100: "#23B2E8",
    blue200: "#1C3643",
    blue300: "#042231",
    red: "#f70d1a",
    orange: "#fd7e14",
    black: "#000000",
    $zdYellow: "#f3e503",
    $zdGreen: "#4dbd98",
    $zdRed: "#EB0E43",
    $zdBlue: "#23b3e8",
    $zdDarkBlue: "#0f1825",
    $zdBlueInverse: "#03293d",
    $zdLightGrey: "#c9c9c9",
    $zdLighterGrey: "rgba(232, 231, 234, 0.2)",
    $zdGrey: "#a5a4a4",
    $zdPurple: "#2d3182",
    $zdOrange: "#F15832",
    $zdFadedOrange: "rgba(241, 88, 50, 0.05)",
    $zdDarkPink: "rgba(235, 14, 67, 1)",
  },
  primaryBorderRadius: "5px",
  media: {
    sm: "@media only screen and (max-width: 600px)",
    md: "@media only screen and (min-width: 768px)",
    lg: "@media only screen and (min-width: 992px)",
    xl: "@media only screen and (min-width: 1200px)",
  },
};

const { spacing, fontSize, colors } = theme;

export const Body = styled.div`
  display: flex;
  flex: 1;
  min-height: calc(100vh - 159px);
  &.tab-component {
  }
`;

export const ToggleLabel = styled.label`
  font-weight: bold;
  font-size: ${fontSize.fontSizeS};
  margin: 0 !important;
  ${({ color }) => css`
    color: ${color};
  `}
`;

export const ToggleContianer = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  flex: 1;
  max-width: 200px;
  margin-right: ${spacing.xLarge};
`;

export const TabListComponent = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

export const ProjectTimeline = styled.div`
  color: ${colors.green};
  margin-left: ${spacing.xLarge};
  font-size: ${fontSize.fontSizeS};
  font-weight: bold;
  svg {
    margin: 0 4px;
  }
`;

export const Content = styled.div`
  display: flex;
  padding: 0 100px;
  height: 100%;
  align-self: stretch;
  flex: 1;
  position: absolute;
  flex-direction: row;
  overflow: auto;
  overflow: scroll;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-self: flex-start;
  color: ${colors.black};
  align-items: flex-end;
  justify-content: space-between;
  h3 {
    font-size: ${fontSize.fontSize};
    font-weight: 700;
    margin: 0;
  }
`;
