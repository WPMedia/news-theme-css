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

export {LinkBackgroundHover};
