const TEXT_ENABLED = 'ჩართულია';
const TEXT_DISABLED = 'გამორთულია';

const CLASSNAME = 'vue-geokbd--statusMessage';
const CLASSNAME_STATE = CLASSNAME + '-state';
const CLASSNAME_HIDDEN = CLASSNAME + ' hidden';
const CLASSNAME_VISIBLE = CLASSNAME + ' visible';

const TEMPLATE = [
  '<div class="vue-geokbd--statusMessage-text">',
    'ქართული კლავიატურა: <u class="' + CLASSNAME_STATE + '"></u><br>',
    'ჩართვა/გამორთვა კლავიშით (\'{$hotkey}\')',
  '</div>',
].join('');

export default class StatusMsgElement {
  private static $root: Element;
  private static $state: Element;

  public static create (hotkey: string): void {
    this.$root = document.createElement('div');
    this.$root.className = CLASSNAME_HIDDEN;
    this.$root.innerHTML = TEMPLATE.replace('{$hotkey}', hotkey);
    this.$state = this.$root
      .querySelector('.' + CLASSNAME_STATE) as Element;

    document.body.appendChild(this.$root);
  }

  public static stateText (isEnabled: boolean): void {
    this.$state.innerHTML = isEnabled ? TEXT_ENABLED : TEXT_DISABLED;
  }

  public static isVisible (isVisible: boolean): void {
    this.$root.className = isVisible ? CLASSNAME_VISIBLE : CLASSNAME_HIDDEN;
  }
}
