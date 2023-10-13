const { clearTextBody } = require('./text-input.js');

// Keyboard Shortcuts
function init(state) {
  document.addEventListener('keydown', (event) => {
    if (!state['keyboardShortcutsEnabled']) return;

    switch (event.key.toLowerCase()) {
      case 'escape':
        clearTextBody();
        return;

      case 't':
        window.scrollTo(-Infinity, -Infinity);
        return;

      case 'v':
        event.ctrlKey && clearTextBody();
        return;
    }
  });
}

module.exports = {
  init
};
