const { lightSwitch } = require('./utils.js');
const { lightSwitchButton, hotkeyToggleButton } = require('./elements.js');

function init(state) {
  // Toggle light or dark mode when sun/moon control panel button is clicked
  lightSwitchButton.addEventListener('click', (event) => {
    lightSwitch(event.target);
  });

  // Toggle hotkeys on/off when keyboard control panel button is clicked
  hotkeyToggleButton.addEventListener('click', (event) => {
    const { classList } = event.target;

    const [toggledOff, toggledOn] = [
      'control-panel__button--toggled-off',
      'control-panel__button--toggled-on'
    ];

    state['keyboardShortcutsEnabled'] = !state['keyboardShortcutsEnabled'];

    switch (state['keyboardShortcutsEnabled']) {
      case true:
        classList.remove(toggledOff);
        classList.add(toggledOn);

        setTimeout(() => {
          classList.remove(toggledOn);
        }, 1500);
        return;

      case false:
        classList.remove(toggledOn);
        classList.add(toggledOff);
        return;
    }
  });
}

module.exports = {
  init
};
