import statusMsgElement from './statusMsgElement';

export default class StatusMsgEff {
  private static visibilityState = false;

  public static init (hotkey: string, enabled: boolean): void {
    statusMsgElement.create(hotkey);
    statusMsgElement.stateText(enabled);
  }

  public static enabled (enabled: boolean): void {
    statusMsgElement.stateText(enabled);
  }

  public static visibility (visibility: boolean): void {
    this.visibilityState = visibility = !!visibility;

    // Add little delay to keep consistent visibility state
    setTimeout(() => {
      if (this.visibilityState === visibility) {
        statusMsgElement.isVisible(visibility);
      }
    }, 100);
  }
}
