import AccessibilityModule from '@curriculumassociates/createjs-accessibility';

/**
 * A custom checkbox component that implements accessibility features.
 * This class creates a visually appealing and fully accessible checkbox
 * with proper focus indicators and ARIA attributes.
 */
export default class CheckBox extends createjs.Container {
  /**
   * Creates a new CheckBox instance.
   * @param {number} width - The width of the checkbox
   * @param {number} height - The height of the checkbox
   * @param {number} tabIndex - The tab order of the checkbox for keyboard navigation
   * @param {Function} callBack - Optional callback function triggered when checkbox state changes
   */
  constructor(width, height, tabIndex, callBack = () => {}) {
    super();
    this.width = width;
    this.height = height;
    this.callBack = callBack;
    this.checked = false;
    // Register the checkbox with accessibility module to enable screen reader support
    AccessibilityModule.register({
      accessibleOptions: { tabIndex },
      displayObject: this,
      role: AccessibilityModule.ROLES.CHECKBOX,
      events: [
        {
          eventName: 'focus',
          listener: this.onFocus,
        },
        {
          eventName: 'blur',
          listener: this.onBlur,
        },
        {
          eventName: 'mousedown',
          listener: this.onChange,
        },
        {
          eventName: 'keyboardClick',
          listener: this.onChange,
        },
      ],
    });
    this._createAsset();
  }

  /**
   * Creates the visual assets for the checkbox by adding the box area and checkmark
   * @private
   */
  _createAsset() {
    this._addBoxArea();
    this._addCheckMark();
  }

  /**
   * Creates the main checkbox container and focus indicator
   * The checkbox has a light gray fill with a dark border
   * Focus indicator is a blue outline that appears when the checkbox gains focus
   * @private
   */
  _addBoxArea() {
    // Create the main checkbox container with a gray fill and dark border
    const box = new createjs.Shape();
    box.graphics
      .setStrokeStyle(1)
      .beginFill('#DEDEDE')
      .beginStroke('#424242')
      .drawRect(0, 0, this.width, this.height);
    box.setBounds(0, 0, this.width, this.height);
    this.addChild(box);

    // Create a focus indicator that appears when the checkbox is focused
    const focusRect = new createjs.Shape();
    focusRect.graphics
      .setStrokeStyle(5)
      .beginStroke('#5FC1FA')
      .drawRect(-2.5, -2.5, this.width + 5, this.height + 5);
    focusRect.setBounds(0, 0, this.width + 5, this.height + 5);
    this.addChild(focusRect);
    focusRect.visible = false;

    this.focusRect = focusRect;
  }

  /**
   * Creates the checkmark symbol that appears when the checkbox is checked
   * The checkmark is a thick line drawn in a check symbol shape
   * @private
   */
  _addCheckMark() {
    const checkMark = new createjs.Shape();
    checkMark.graphics
      .setStrokeStyle(this.width / 4)
      .beginStroke('#424242')
      .moveTo(0, this.height * 0.4)
      .lineTo(this.width * 0.3, this.height - 8)
      .lineTo(this.width - 6, 0);
    this.addChild(checkMark);

    // Position the checkmark with slight offset for better visual alignment
    checkMark.set({ x: 2, y: 2 });

    checkMark.visible = false;
    this.checkMark = checkMark;
  }

  /**
   * Handles state changes when the checkbox is clicked or activated via keyboard
   * Updates the visual state and accessibility properties
   */
  onChange() {
    this.accessible.requestFocus();
    this.checked = !this.checked;
    this.checkMark.visible = this.checked;
    this.accessible.checked = this.checked;
    this.callBack();
  }

  /**
   * Shows the focus indicator when the checkbox receives focus
   */
  onFocus() {
    this.focusRect.visible = true;
  }

  /**
   * Hides the focus indicator when the checkbox loses focus
   */
  onBlur() {
    this.focusRect.visible = false;
  }
}