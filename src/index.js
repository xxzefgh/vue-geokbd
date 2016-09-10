import './style.css'
import directive from './directive'
import {init as statusMsgInit} from './statusMsg'

const install = (Vue, {enabled = false, hotkey = '~', statusMessage = true} = {}) => {
  const options = {
    enabled,
    hotkey,
    statusMessage
  };

  statusMsgInit(options);
  Vue.directive('geokbd', directive(options));
};

module.exports = {
  install
};
