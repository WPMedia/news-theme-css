import styled from 'styled-components';
import { lightenDarkenColor } from '../framework';

/**
 * LinkBackgroundHover
 * @description Base styled component to augment link components with background color hover state
 * @param primaryColor: Primary color set in the theme
 * @param foregroundColor: Color of the text on hover (defaults to #fff)
 */
const LinkBackgroundHover = styled.a`
  transition: fill 0.3s ease;
  &:active, &:hover{
    color: ${(props) => props.foregroundColor || '#fff'};
    background-color: ${(props) => lightenDarkenColor(props.primaryColor, 40)};
  }
`;

/**
 * LinkBackgroundHoverCSSProp
 * @description Base styled component literal to be used as an inline css prop on any element
 * ref: https://styled-components.com/docs/api#css-prop
 * @param primaryColor: Primary color set in the theme
 * @param foregroundColor: Color of the text on hover (defaults to #fff)
 */
const LinkBackgroundHoverCSSProp = `
  transition: fill 0.3s ease;
  &:active, &:hover{
    color: ${(props) => props.foregroundColor || '#fff'};
    background-color: ${(props) => lightenDarkenColor(props.primaryColor, 40)};
  }
`;

/**
 * LinkForegroundHover
 * @description Base styled component to augment link components with color hover state
 * @param primaryColor: Primary color set in the theme
 */
const LinkForegroundHover = styled.a`
  transition: fill 0.3s ease;
  &:active, &:hover{
    color: ${(props) => lightenDarkenColor(props.primaryColor, 40)};
  }
`;

/**
 * LinkForegroundHoverCSSProp
 * @description Base styled component literal to be used as an inline css prop on any element
 * ref: https://styled-components.com/docs/api#css-prop
 * @param primaryColor: Primary color set in the theme
 * @param foregroundColor: Color of the text on hover (defaults to #fff)
 */
const LinkForegroundHoverCSSProp = `
  transition: fill 0.3s ease;
  &:active, &:hover{
    color: ${(props) => lightenDarkenColor(props.primaryColor, 40)};
  }
`;


/**
 * LinkSVGHover
 * @description Base styled component to augment link components with SVG Fill color hover state
 * @param primaryColor: Primary color set in the theme
 */
const LinkSVGHover = styled.a`
  transition: fill 0.3s ease;
  &:active svg path, &:hover svg path{
    fill: ${(props) => lightenDarkenColor(props.primaryColor, 40)};
  }
`;

/**
 * LinkSVGHoverCSSProp
 * @description Base styled component literal to be used as an inline css prop on any element
 * ref: https://styled-components.com/docs/api#css-prop
 * @param primaryColor: Primary color set in the theme
 */
const LinkSVGHoverCSSProp = `
  transition: fill 0.3s ease;
  &:active svg path, &:hover svg path{
    fill: ${(props) => lightenDarkenColor(props.primaryColor, 40)};
  }
`;

export {
    LinkBackgroundHover,
    LinkBackgroundHoverCSSProp,
    LinkForegroundHover,
    LinkForegroundHoverCSSProp,
    LinkSVGHover,
    LinkSVGHoverCSSProp};
