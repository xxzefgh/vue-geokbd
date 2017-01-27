import handleKeypress from './keypress';
import statusMsg from './statusMsg';

export default (options) => ({
  bind: function () {
    this.keypressEvent = (evt) => {
      // Don't capture Ctrl/Meta keypress
      if (evt.metaKey || evt.ctrlKey) return;

      // Check if hotkey was pressed
      if (options.hotkey === String.fromCharCode(evt.which)) {
        evt.preventDefault();

        this.toggleGlobalState();
        return;
      }

      // Check enabled state
      if (options.enabled === false) return;

      handleKeypress(evt);
    };

    this.focusEvent = () => {
      statusMsg.visibility(true, options.enabled, options.statusMessage);
    };

    this.blurEvent = () => {
      statusMsg.visibility(false, options.enabled, options.statusMessage);
    };

    this.el.addEventListener('keypress', this.keypressEvent);
    this.el.addEventListener('focus', this.focusEvent);
    this.el.addEventListener('blur', this.blurEvent);
  },

  unbind: function () {
    this.el.removeEventListener('keypress', this.keypressEvent);
    this.el.removeEventListener('focus', this.focusEvent);
    this.el.removeEventListener('blur', this.blurEvent);
  },

  toggleGlobalState: function () {
    options.enabled = !options.enabled;
    statusMsg.syncText(options.enabled);
  }
});
