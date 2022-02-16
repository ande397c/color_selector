"use strict";
window.addEventListener("load", setup);

// Init
function setup() {
  document.querySelector("#color_input").addEventListener("input", showColor);
  showColor();
}

// Get color from input
function getColor() {
  let getColor = document.querySelector("#color_input").value;
  return getColor;
}

function showColor() {
  let hexCode = getColor();
  let rgbVal = convertToRGB(hexCode);
  changeColorBox(hexCode);

  let hexVal = convertToHex(rgbVal);
  let hslVal = convertToHSL(rgbVal);

  showHex(hexCode);
  showRGB(rgbVal);
  showHSL(hslVal);
}

// Change color of box based on color input
function changeColorBox(hexVal) {
  document.querySelector(".color_box").style.backgroundColor = hexVal;
}
// Convert from rgb to HEX
function convertToHex(values) {
  let r = values.r.toString(16);
  let g = values.g.toString(16);
  let b = values.b.toString(16);

  let hexCode = "#" + r + g + b;

  return hexCode;
}

function rgbToCssColor(values) {}

// Display hex code based on color input
function showHex(hexCode) {
  document.querySelector("#hex_value").textContent = hexCode;
}

// Convert from hex to rgb
function convertToRGB(hexCode) {
  let r = parseInt(hexCode.substring(1, 3), 16);
  let g = parseInt(hexCode.substring(3, 5), 16);
  let b = parseInt(hexCode.substring(5, 7), 16);

  let values = {
    r,
    g,
    b,
  };

  return values;
}

// Display rgb efter conversion
function showRGB(values) {
  document.querySelector("#rgb_value").textContent = `${values.r}. ${values.g}. ${values.b}`;
}

// Convert from rgb to hsl
function convertToHSL(values) {
  let R = values.r;
  let G = values.g;
  let B = values.b;

  R /= 255;
  G /= 255;
  B /= 255;

  let h, s, l;

  const min = Math.min(R, G, B);
  const max = Math.max(R, G, B);

  if (max === min) {
    h = 0;
  } else if (max === R) {
    h = 60 * (0 + (G - B) / (max - min));
  } else if (max === G) {
    h = 60 * (2 + (B - R) / (max - min));
  } else if (max === B) {
    h = 60 * (4 + (R - G) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  return {
    h,
    s,
    l,
  };
}

// Display hsl efter conversion
function showHSL(hslVal) {
  let h = hslVal.h.toFixed(0);
  let s = hslVal.s.toFixed(0);
  let l = hslVal.l.toFixed(0);
  document.querySelector("#hsl_value").textContent = h + "%. " + s + "%. " + l + "%";
}
