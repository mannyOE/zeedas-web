import styled from "styled-components";
import { theme } from "../style";
import { Button } from "reactstrap";
import { Content } from "../style";

const { colors, spacing, primaryBorderRadius, fontSize } = theme;

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
`;

export const DialogContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 500px;
  max-width: 500px;
  margin: auto;
  min-height: 350px;
  flex-direction: column;
  border-radius: 15px;
  background-color: ${colors.white};
  padding: ${spacing.xLarge};
`;

export const TextWrapper = styled.div`
  width: 100%;
  height: ${spacing.medium};
  display: flex;
  height: 60px;
  background-color: ${colors.$zdBlue}1A;
  padding: ${spacing.large};
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0;
    color: ${colors.gray600};
  }
`;

export const UploadButton = styled(Button).attrs(() => ({
  size: "md",
}))`
  border-radius: ${primaryBorderRadius};
  border: 1px solid ${colors.$zdBlue};
  color: ${colors.$zdBlue};
  background-color: transparent;
  width: 70px;
  margin: 0 ${spacing.small};
`;

export const Text = styled.p`
  margin: ${spacing.medium} 0;
  color: ${colors.black};
  font-weight: bold;
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  margin: ${spacing.medium} 0;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const CompleteButton = styled(UploadButton)`
  width: 100%;
  background-color: ${colors.$zdBlue}CC;
  color: ${colors.white};
  margin: ${spacing.medium} 0;
`;

export const Thumbnail = styled.div`
  border-radius: ${primaryBorderRadius};
  width: 100px;
  height: 100px;
  background-color: ${colors.gray200};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.gray300};
  display: flex;
  overflow: hidden;
  img {
    height: 100px;
    max-width: 100%;
    object-fit: cover;
    border-radius: ${primaryBorderRadius};
  }
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 4px;
    right: 4px;
  }
`;

export const BodyCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  div {
    background-color: transparent !important;
    min-height: 0px !important;
  }
`;

export const FilesContent = styled(Content)`
  display: flex;
  min-width: 100%;
  width: 100%;
  max-height: 100%;
  height: auto;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: ${spacing.medium} 0;
  overflow-y: auto;
`;

export const Preview = styled.div`
  margin: ${spacing.small};
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: ${colors.white};
  border-radius: 5px;
  height: 300px;
  box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.1);
`;

export const PreviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 5px 5px 0px 0px;
  align-items: flex-start;
  border: 1px solid;
  border-color: transparent transparent ${colors.gray300} transparent;
  height: 60px;
  align-items: center;
  img {
    width: 28px;
    height: 28px;
    margin: 0 ${spacing.xSmall};
    padding: 0;
  }
  p {
    margin: 0;
    padding: 0;
    font-size: ${fontSize.fontSizeXS};
  }
  p:first-child {
    font-weight: bolder;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${colors.black};
    margin: 0;
  }
`;

export const PreviewBody = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: cover;
  }
`;
