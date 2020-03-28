const defaultFontSize = 16;

function calculateRem(valueInPixals){
  valueInPixals = parseFloat(valueInPixals.replace('px', ''));
  return `${valueInPixals / defaultFontSize}rem`;
}

const framework = {
  variables: {
    defaultFontSize: defaultFontSize
  },
  spacers: {
    xxs: calculateRem("4px"),
    xs: calculateRem("8px"),
    sm: calculateRem("16px"),
    md: calculateRem("24px"),
    lg: calculateRem("32px"),
    xl: calculateRem("48px"),
    xxl: calculateRem("64px")
  },
  gridBreakpoints: {
    sm: calculateRem("0px"),
    md: calculateRem("768px"),
    lg: calculateRem("1024px"),
    xl: calculateRem("1440px")
  },
  gridBreakpointsMax: {
    sm: calculateRem("767px"),
    md: calculateRem("1023px"),
    lg: calculateRem("1439px")
  }
};

export default framework;
