require('./style.css');

const fn = require('./js/utils.js');
const controlPanel = require('./js/control-panel.js');
const hotkeys = require('./js/keyboard-shortcuts.js');
const textInput = require('./js/text-input.js');
const state = require('./js/state.js');

fn.ariaHideAllNodesExceptFor([
  'text-input',
  'text-input-reset-button',
  'text-body'
]);

controlPanel.init(state);
hotkeys.init(state);
textInput.init();
