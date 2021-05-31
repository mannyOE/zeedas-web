import styled, { css } from "styled-components";
import { theme } from "../../style";
import { Text } from "../../_components/form/style";
import { DropdownContainer } from "../../_components/drop-down/style";

const {
  spacing, fontSize, colors, primaryBorderRadius,
} = theme;

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex: 0;
  font-weight: bold;
  font-size: 18px;
  align-items: flex-start;
  color: ${colors.$zdBlueInverse};
  padding: ${spacing.large};
  border: 1px solid ${colors.gray600};
  border-color: transparent transparent ${colors.gray300} transparent;
  ${Text} {
    font-size: 18px;
  }
 `;

export const TextArea = styled.textarea.attrs(() => ({
  onKeyUp({ target }) {
    target.style.height = "1px";
    target.style.height = `${target.scrollHeight}px`;
  },
}))`
  border: none;
  resize: none;
  font-family: 'Futura', sans-serif,
  font-size: ${fontSize.fontSizeL};
  font-weight: bold;
  display: flex;
  flex-grow: 1;
  height: 25px;
  overflow: hidden;
`;

export const Badge = styled.div`
  margin: 0 ${spacing.small};
  display: flex;
  flex: 0;
  min-width: 100px;
  align-items: center;
  justify-content: center;
  height: 35px;
  font-size: ${fontSize.fontSize};
  border-radius: ${primaryBorderRadius};
  color: ${colors.white};
  ${({ color }) => color && css`
    background-color: ${color}
  `}
`;

export const FormBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${spacing.medium};
  ${Text} {
    font-size: ${fontSize.fontSizeS};
  }
`;

export const TagsContainer = styled.div`
  margin-left: 25%;
  width: 75%;
  display: flex;
  flex-wrap: wrap;
`;

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  p {
    margin: 0;
    color: ${colors.black}
  }
  ${DropdownContainer}{
    min-width: 100%;
    margin: 0;
    input {
      min-width: 100%;
    }
    border-radius: ${primaryBorderRadius};
  }
`;

export const FormRow = styled.div`
  width: 100%;
  display: flex;
  margin: ${spacing.small} 0;
`;

export const Label = styled.label`
  width: 25%;
  color: ${colors.black};
`;

export const IconRing = styled.div`
  min-height: 25px;
  min-width: 25px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 0;
  border: 1px solid ${colors.gray400};
  margin-right: ${spacing.xSmall};
  ${(({ color }) => color && css`
    background-color: ${color};
    border: none;
  `)}
`;
