const defaultFontSize = 16;

const calculateRem = function(valueInPixals){
  valueInPixals = parseFloat(valueInPixals.replace('px', ''));
  return `${valueInPixals / defaultFontSize}rem`;
};

const lightenDarkenColor = function (col, amt) {
  let usePound = false;
  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }
  let num = parseInt(col, 16);
  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

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

export {framework, calculateRem, lightenDarkenColor};
