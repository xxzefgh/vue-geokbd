import handleKeypress from './keypress';
import statusMsg from './statusMsg';

export default (options) => ({
  bind: function (el, binding) {
    // Vue 1.x support
    if (this && this.el) {
      el = this.el;
      binding = this;
    }

    binding.keypressEvent = (evt) => {
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

    binding.focusEvent = () => {
      statusMsg.visibility(true, options.enabled, options.statusMessage);
    };

    binding.blurEvent = () => {
      statusMsg.visibility(false, options.enabled, options.statusMessage);
    };

    el.addEventListener('keypress', binding.keypressEvent);
    el.addEventListener('focus', binding.focusEvent);
    el.addEventListener('blur', binding.blurEvent);
  },

  unbind: function (el, binding) {
    // Vue 1.x support
    if (this && this.el) {
      el = this.el;
      binding = this;
    }

    el.removeEventListener('keypress', binding.keypressEvent);
    el.removeEventListener('focus', binding.focusEvent);
    el.removeEventListener('blur', binding.blurEvent);
  },

  toggleGlobalState: function () {
    options.enabled = !options.enabled;
    statusMsg.syncText(options.enabled);
  }
});
