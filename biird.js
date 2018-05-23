const baseURL = 'https://api.biird.io';
const resourceValueURL = 'https://api.biird.io/resourceValue/';
const biirdOutletSelector = '.biird';
const dimensionsAttributeSelector = 'data-biird-dimensions';
const scriptSelector = 'script[data-biird-dimensions]';
var biirdBaseDimensions = {};
var biird = {
  update: function(newDimensions) {
    console.log('Updating with ' + JSON.stringify(newDimensions));

    biirdBaseDimensions = newDimensions;
  },
  refresh: function() {
    console.log('Refreshing with ' + JSON.stringify(biirdBaseDimensions));
    refreshAllBiirdContent(biirdBaseDimensions);
  }
};

function refreshAllBiirdContent(baseDimension) {
  var placeholders = document.querySelectorAll(biirdOutletSelector);
  for (i = 0; i < placeholders.length; i++) {
    let counter = i;
    let placeholder = placeholders[counter];
    let biirdId = placeholder.getAttribute('data-biird-id');

    let overrideDimensionJSON = placeholder.getAttribute(
      dimensionsAttributeSelector
    );
    let overrideDimension = {};
    if (
      overrideDimensionJSON != undefined &&
      overrideDimensionJSON.length > 0
    ) {
      overrideDimension = JSON.parse(overrideDimensionJSON);
    }
    let finalizedDimensions = {};
    finalizedDimensions = Object.assign(
      finalizedDimensions,
      baseDimension,
      overrideDimension
    );
    let url = encodeURI(
      resourceValueURL +
        biirdId +
        '?' +
        attributeParametersFromDimensions(finalizedDimensions)
    );

    if (placeholder.tagName == 'IMG') {
      placeholder.src = url;
    } else if (placeholder.getAttribute('data-biird-background') == 'true') {
      placeholder.style.backgroundImage = "url('" + url + "')";
    } else {
      retrieveBiirdContent(url, placeholder);
    }
  }
}

function retrieveBiirdContent(url, placeholder) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  xhr.send();
  xhr.onload = function() {
    if (xhr.status === 200) {
      placeholder.innerHTML = xhr.responseText;
    }
  };
}

function attributeParametersFromDimensions(dimensions) {
  return Object.keys(dimensions)
    .map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(dimensions[k]);
    })
    .join('&');
}
