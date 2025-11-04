import _, { noop } from 'lodash';
import Button from './Button';

/**
 * ClearInputButton extends Button to create a circular button with an 'x' symbol
 * commonly used for clearing input fields. This component inherits accessibility
 * features from the base Button class and customizes the visual appearance.
 */
export default class ClearInputButton extends Button {
  /**
   * Creates a new ClearInputButton instance
   * @param {Object} options - Configuration options for the button
   * @param {number} tabIndex - The tab order index for keyboard navigation
   * @param {Function} callBack - Optional callback function triggered on button click (defaults to no-op)
   */
  constructor(options, tabIndex, callBack = _.noop) {
    super(options, tabIndex, callBack);
  }

  /**
   * Creates a circular background for the button
   * @param {string} color - The fill color for the button background
   * @private
   */
  _fillBackground(color) {
    this.background.graphics
      .beginFill(color)
      .drawCircle(0, 0, this.height * 0.5);
  }

  /**
   * Override mouse down handler to prevent default behavior
   * This maintains consistent appearance during mouse interaction
   * @private
   */
  _onMouseDown() {
    noop();
  }

  /**
   * Override mouse up handler to prevent default behavior
   * This maintains consistent appearance during mouse interaction
   * @private
   */
  _onMouseUp() {
    noop();
  }

  /**
   * Creates and adds the circular grey background to the button
   * This provides the base visual element for the clear button
   * @private
   */
  _addBackground() {
    this.background = new createjs.Shape();
    this._fillBackground('grey');
    this.addChild(this.background);
  }

  /**
   * Creates and adds the focus indicator ring around the button
   * The indicator is a black circle that appears when the button is focused
   * @private
   */
  _addFocusIndicator() {
    this.focusIndicator = new createjs.Shape();
    this.focusIndicator.name = 'focusIndicator';
    this.focusIndicator.graphics
      .beginStroke('black')
      .setStrokeStyle(3)
      .drawCircle(0, 0, this.height * 0.55);
    this.addChild(this.focusIndicator);
    this.focusIndicator.visible = false;
  }

  /**
   * Creates and adds the 'x' symbol text to the button
   * The text is centered within the button using the button height for sizing
   * @private
   */
  _addText() {
    this.text = new createjs.Text('x', `${this.height}px Arial`, 'white');
    const textBounds = this.text.getBounds();
    // Center the text both horizontally and vertically
    this.text.set({
      x: -(textBounds.width * 0.5),
      y: -(textBounds.height * 0.5),
    });
    this.addChild(this.text);
  }
}