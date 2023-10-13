const { textInput, textBody, textInputResetButton } = require('./elements.js');

function clearTextBody() {
  textInput.focus();
  textInput.value = '';
  textBody.textContent = '';
}

function init() {
  // Overwrite noscript warnings in the default HTML
  (() => {
    ['title', 'placeholder'].forEach((attr) => {
      textInput.setAttribute(attr, 'Add text then start Read Aloud!');
    });

    ['disabled', 'style'].forEach((attr) => {
      textInput.removeAttribute(attr);
    });
  })();

  // Write text content from input to document to be recognized by Read Aloud
  textInput.addEventListener('input', (event) => {
    textBody.textContent = event.target.value;
  });

  // Clear all text content when reset button is clicked
  textInputResetButton.addEventListener('click', clearTextBody);
}

module.exports = {
  init,
  clearTextBody
};
