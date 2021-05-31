import styled from 'styled-components';
import { theme } from '../../style';

const {spacing, colors, primaryBorderRadius, fontSize} = theme;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${spacing.large} ${spacing.xSmall};
  padding: ${spacing.xSmall};
  max-width: 700px;
`

export const Content = styled.div.attrs(() => ({
  className: 'container'
}))`
  background-color: ${colors.white};
  margin: ${spacing.xSmall} 0;
  border-radius: ${primaryBorderRadius};
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: ${spacing.medium} 0;
  height: 100%;
  overflow-y: auto;
  .row {
    width: 100%;
    flex-wrap: nowrap;
    margin: 0;
  }
`

export const OverviewCard = styled.div.attrs(() => ({
  className: 'col-md-6 col-lg-6 col-sm-6'
}))`
  margin: ${spacing.small};
  border-radius: ${primaryBorderRadius};
  max-height: 250px;
  max-width: 300px;
  min-width: 200px;
  min-height: 150px;
  width: 100%;
  background-color: ${({color}) => color};
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  flex: 1;
  aspect-ratio: auto;
  padding: ${spacing.medium}
`

export const Group = styled.div`
  display: flex;
  flex: 0;
  justify-content: space-between;
`

export const IconContainer = styled.div`
  padding: ${spacing.medium};
  background-color: rgba(255,255,255, .1);
  display: flex;
  flex: 0;
  width: fit-content;
  height: fit-content;
  border-radius: 7px;
`

export const CountContainer = styled.div`
  color: ${colors.white};
  font-weight: bolder;
  font-size: ${fontSize.fontSizeXxl};
  align-self: center;
  margin: 0 ${spacing.small};
`

export const Text = styled.p`
  color: ${colors.white};
  font-weight: bolder;
  font-size: ${fontSize.fontSizeL};
  margin: 0;
`

