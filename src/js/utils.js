// Apply aria-hidden and -1 tab index to (ir)relevant nodes
function ariaHideAllNodesExceptFor(elementIdsToSkip) {
  const nodes = document.querySelectorAll('*');

  nodes.forEach((node) => {
    switch (node.tagName.toLowerCase()) {
      case 'html':
      case 'head':
      case 'meta':
      case 'title':
      case 'style':
      case 'body':
      case 'script':
      case 'msreadoutspan':
        return;

      default:
        if (elementIdsToSkip.some((id) => node.id === id)) return;

        node.setAttribute('aria-hidden', 'true');

        const fNodes = node.querySelectorAll(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        fNodes.forEach((fNode) => {
          if (elementIdsToSkip.some((id) => fNode.id === id)) return;

          fNode.setAttribute('tabindex', '-1');
        });
    }
  });
}

// Light / Dark Theme Switcher
function lightSwitch(button) {
  const root = document.documentElement;

  const setTheme = (arr) => {
    root.style.setProperty('--background-color', arr[0]);
    root.style.setProperty('--input-background-color', arr[1]);
    root.style.setProperty('--text-color', arr[2]);
    root.style.setProperty('--shadow-color', arr[3]);
  };

  const lightsOff = () => {
    setTheme(['#000', '#222', '#fff', '#88888822']);
    root.setAttribute('data-theme', 'dark');
    button.textContent = '☀️';
  };

  const lightsOn = () => {
    setTheme(['#fff', '#ccc', '#000', '#66666666']);
    root.setAttribute('data-theme', 'light');
    button.textContent = '🌙';
  };

  root.getAttribute('data-theme') === 'light' ? lightsOff() : lightsOn();
}

module.exports = {
  ariaHideAllNodesExceptFor,
  lightSwitch
};
