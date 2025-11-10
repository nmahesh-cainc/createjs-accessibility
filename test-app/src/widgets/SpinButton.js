import AccessibilityModule from '@curriculumassociates/createjs-accessibility';
import Button from './Button';

/**
 * SpinButton widget that provides an accessible numeric input control with increment/decrement buttons.
 * Extends CreateJS Container to create a composite widget that follows accessibility guidelines.
 * @extends createjs.Container
 */
export default class SpinButton extends createjs.Container {
  /**
   * Creates a new SpinButton instance with accessibility features.
   * Initializes the widget with specified options, registers it with the accessibility module,
   * and sets up the visual components including increment/decrement buttons and focus indicator.
   * @param {Object} params - Configuration parameters for the spin button
   * @param {Object} params.options - Configuration options including min/max values and dimensions
   * @param {number} params.options.maxValue - Maximum allowed value for the spin button
   * @param {number} params.options.minValue - Minimum allowed value for the spin button
   * @param {number} params.options.width - Width of the spin button widget
   * @param {number} params.options.height - Height of the spin button widget
   * @param {createjs.Text} params.textContainer - Text container that displays the current value
   * @param {Function} params.callback - Callback function called when the value changes
   */
  constructor({ options, textContainer, callback }) {
    super();
    const { maxValue, minValue } = options;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.targetContainer = textContainer;
    this.callback = callback;

    this._width = options.width;
    this._height = options.height;
    this.currentValue = Number(textContainer.text);
    textContainer.text = this.currentValue;

    AccessibilityModule.register({
      accessibleOptions: {
        max: maxValue,
        min: minValue,
        readOnly: false,
        required: true,
        tabIndex: 0,
        value: this.currentValue,
      },
      displayObject: this,
      role: AccessibilityModule.ROLES.SPINBUTTON,
      events: [
        {
          eventName: 'increment',
          listener: this.onIncrement,
        },
        {
          eventName: 'decrement',
          listener: this.onDecrement,
        },
        {
          eventName: 'change',
          listener: this.onChange,
        },
        {
          eventName: 'focus',
          listener: this.onFocus,
        },
        {
          eventName: 'blur',
          listener: this.onBlur,
        },
      ],
    });

    this.setBounds(0, 0, this.width, this.height);
    this.setupFocusIndicator(this.width, this.height);
    this.createButtons();
  }

  /**
   * Creates and configures the increment and decrement buttons for the spin button widget.
   * Sets up two Button instances - one for incrementing and one for decrementing the value.
   * Both buttons are positioned vertically and share the same width as the parent widget.
   * The increment button is positioned at the top half, decrement button at the bottom half.
   */
  createButtons() {
    const options = {
      type: 'button',
      value: '+',
      name: 'Increment',
      enabled: true,
      autoFocus: true,
      width: this.width,
      height: this.height * 0.5,
    };
    // Increment button
    this.incBtn = new Button(options, 0, this.onIncrement.bind(this));
    this.addChild(this.incBtn);

    // Decrement button
    options.value = '-';
    options.name = 'Decrement';
    this.decBtn = new Button(options, 0, this.onDecrement.bind(this));
    this.addChild(this.decBtn);

    this.decBtn.y = this.height * 0.5;
  }

  /**
   * Handles the increment event when the up/increment button is pressed.
   * Increases the current value by 1, ensuring it doesn't exceed the maximum allowed value.
   * After updating the value, triggers the target container update and callback.
   */
  onIncrement() {
    this.currentValue =
      this.currentValue + 1 > this.maxValue
        ? this.maxValue
        : this.currentValue + 1;
    this.updateTargetValue();
  }

  /**
   * Handles the decrement event when the down/decrement button is pressed.
   * Decreases the current value by 1, ensuring it doesn't go below the minimum allowed value.
   * After updating the value, triggers the target container update and callback.
   */
  onDecrement() {
    this.currentValue =
      this.currentValue - 1 < this.minValue
        ? this.minValue
        : this.currentValue - 1;
    this.updateTargetValue();
  }

  /**
   * Handles the change event when the spin button value is modified programmatically or through accessibility APIs.
   * Updates the current value to the new value provided in the event and triggers the target update.
   * @param {Object} evt - Change event object containing the new value
   * @param {number} evt.value - The new value to set for the spin button
   */
  onChange(evt) {
    this.currentValue = evt.value;
    this.updateTargetValue();
  }

  /**
   * Updates the target text container with the current value and synchronizes the accessibility value.
   * This method ensures that both the visual display and the accessibility layer reflect the current value.
   * Also triggers the callback function to notify listeners of the value change.
   */
  updateTargetValue() {
    this.targetContainer.text = this.currentValue;
    this.accessible.value = this.currentValue;
    this.callback();
  }

  /**
   * Creates and configures the visual focus indicator for the spin button widget.
   * The focus indicator is a blue rectangular border that appears when the widget receives focus.
   * It's initially hidden and becomes visible during focus/blur events for accessibility.
   * @param {number} width - Width of the focus indicator rectangle
   * @param {number} height - Height of the focus indicator rectangle
   */
  setupFocusIndicator(width, height) {
    this._focusIndicator = new createjs.Shape();
    this._focusIndicator.visible = false;
    this._focusIndicator.graphics
      .setStrokeStyle(5)
      .beginStroke('#5FC1FA')
      .drawRect(-2.5, -2.5, width + 5, height + 5);
    this.addChild(this._focusIndicator);
  }

  /**
   * Handles the focus event by making the focus indicator visible.
   * This provides visual feedback when the spin button widget receives keyboard focus,
   * improving accessibility for users who navigate with the keyboard.
   */
  onFocus() {
    this._focusIndicator.visible = true;
  }

  /**
   * Handles the blur event by hiding the focus indicator.
   * This removes the visual focus feedback when the spin button widget loses keyboard focus,
   * maintaining a clean appearance when the widget is not actively focused.
   */
  onBlur() {
    this._focusIndicator.visible = false;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }
}
