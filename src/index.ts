import directive from './directive';
import statusMsg from './statusMsgEff';
import { Options } from './interfaces';

const install = (
    Vue: any,
    { hotkey = '~', enabled = false, statusMessage = true } = {},
  ) => {
  const options: Options = { hotkey, enabled, statusMessage };

  statusMsg.init(options.hotkey, options.enabled);
  Vue.directive('geokbd', directive(options));
};

export = { install };
