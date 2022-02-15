"use strict";
window.addEventListener("load", setup);

const colorSelector = document.querySelector("#color_input");

function setup() {
  console.log("setup");
  colorSelector.addEventListener("input", colorInput);
}

function colorInput() {
  let getColor = colorSelector.value;
  document.querySelector("#hex_value").textContent = getColor;
  document.querySelector(".color_box").style.backgroundColor = getColor;
  convertToRGB(getColor);
}

function convertToRGB(hex) {
  // Remove #
  const removeFirstHex = hex.substring(1);

  let rVal = removeFirstHex.substring(0, 2);
  let gVal = removeFirstHex.substring(2, 4);
  let bVal = removeFirstHex.substring(4, 6);

  let r = parseInt(rVal, 16);
  let g = parseInt(gVal, 16);
  let b = parseInt(bVal, 16);

  document.querySelector("#rgb_value").textContent = `${r}. ${g}. ${b}`;

  let values = {
    r,
    g,
    b,
  };

  convertToHSL(values);

  return values;
}

function convertToHSL(values) {
  //   console.log(values);

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

  document.querySelector("#hsl_value").textContent = h.toFixed() + "%. " + s.toFixed() + "%. " + l.toFixed() + "%";
}
