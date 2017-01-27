const STATUS_MSG_TEXT_ON = 'ჩართულია';
const STATUS_MSG_TEXT_OFF = 'გამორთულია';
const STATUS_MSG_CLASS = 'vue-geokbd--statusMessage';
const STATUS_MSG_CLASS_VISIBLE = STATUS_MSG_CLASS + ' visible';
const STATUS_MSG_CLASS_HIDDEN = STATUS_MSG_CLASS + ' hidden';

var element, showState = false;

export const init = (options) => {
  element = document.createElement('div');
  element.className = STATUS_MSG_CLASS;
  element.innerHTML = `
  <div class="vue-geokbd--statusMessage-text">
    ქართული კლავიატურა: <u class="vue-geokbd--statusMessage-state"></u><br>
    ჩართვა/გამორთვა კლავიშით ('${options.hotkey}')
  </div>
`;

  document.body.appendChild(element);
};

const syncText = (enabled) => {
  var statusMessageStateElement = element.querySelector('.vue-geokbd--statusMessage-state');

  statusMessageStateElement.innerHTML = enabled ? STATUS_MSG_TEXT_ON : STATUS_MSG_TEXT_OFF;
};

const visibility = (visibility, enabled, statusMessage) => {
  if (statusMessage === false) return;
  showState = visibility = !!visibility;

  // Add little debounce to keep consistent visibility state
  setTimeout(function () {
    if (showState === visibility) {
      element.className = visibility ? STATUS_MSG_CLASS_VISIBLE : STATUS_MSG_CLASS_HIDDEN;
      syncText(enabled);
    }
  }, 100);
};

export default { syncText, visibility };
