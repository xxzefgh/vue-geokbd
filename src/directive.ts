import handleKeypress from './keypress';
import statusMsg from './statusMsgEff';
import { Options, KeypressEvent } from './interfaces';

export default (options: Options) => ({
  bind: function (el: any, binding: any) {
    // Vue 1.x support
    if (this && this.el) {
      el = this.el;
      binding = this;
    }

    binding.keypressEvent = (evt: KeypressEvent) => {
      // Don't capture Ctrl/Meta keypress
      if (evt.metaKey || evt.ctrlKey) {
        return;
      }

      // Check if hotkey was pressed
      if (options.hotkey === String.fromCharCode(evt.which)) {
        evt.preventDefault();

        statusMsg.enabled(options.enabled = !options.enabled);
      } else {
        // Check enabled state
        if (options.enabled === true) {
          handleKeypress(evt);
        }
      }
    };

    binding.focusEvent = () => {
      if (options.statusMessage) {
        statusMsg.visibility(true);
      }
    };

    binding.blurEvent = () => {
      if (options.statusMessage) {
        statusMsg.visibility(false);
      }
    };

    el.addEventListener('keypress', binding.keypressEvent);
    el.addEventListener('focus', binding.focusEvent);
    el.addEventListener('blur', binding.blurEvent);
  },

  unbind: function (el: any, binding: any) {
    // Vue 1.x support
    if (this && this.el) {
      el = this.el;
      binding = this;
    }

    el.removeEventListener('keypress', binding.keypressEvent);
    el.removeEventListener('focus', binding.focusEvent);
    el.removeEventListener('blur', binding.blurEvent);
  },
});
