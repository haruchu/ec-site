import {
  css,
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from "styled-components";

export const phone = (
  phone: CSSObject | TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
  @media (max-width: 560px) {
    ${css(phone, ...interpolations)}
  }
`;

export const tablet = (
  tablet: CSSObject | TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
  @media (max-width: 1024px) {
    ${css(tablet, ...interpolations)}
  }
`;

export const pc = (
  pc: CSSObject | TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
  @media (min-width: 1025px) {
    ${css(pc, ...interpolations)}
  }
`;
