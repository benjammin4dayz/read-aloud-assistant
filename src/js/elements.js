// Get handle to elements
const getEl = (elementId, strict = 1) => {
  let element = document.getElementById(elementId);
  const missingElementWarning = `Missing element specified by ID '${elementId}'!`;

  if (element) {
    return element;
  } else if (strict) {
    throw new ReferenceError(
      missingElementWarning + '\nTo lazily resolve this, pass strict=0'
    );
  } else {
    console.error(
      [
        missingElementWarning,
        `Returning a temporary div element as a stopgap`,
        [
          `This may have unintended results in cases`,
          `where a specific attribute is expected.`
        ].join(' ')
      ].join('\n')
    );
    const noTypeErrorsPlease = document.createElement('div');
    noTypeErrorsPlease.id = elementId;
    return noTypeErrorsPlease;
  }
};

module.exports = {
  lightSwitchButton: getEl('light-toggle-button'),
  hotkeyToggleButton: getEl('hotkey-toggle-button'),
  textInputResetButton: getEl('text-input-reset-button'),
  textInput: getEl('text-input'),
  textBody: getEl('text-body')
};
