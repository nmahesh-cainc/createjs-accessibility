import AccessibilityModule from '@curriculumassociates/createjs-accessibility';
import Button from './Button';

/**
 * SpinButton widget for CreateJS accessibility library.
 * 
 * This class implements a spin button control that allows users to increment or decrement
 * a numeric value through button clicks or keyboard input. It provides ARIA-compliant
 * accessibility features and integrates with the CreateJS accessibility module.
 * 
 * The spin button consists of increment and decrement buttons, and displays the current
 * value in an associated text container. It supports minimum and maximum value constraints
 * and provides visual focus indicators.
 */
export default class SpinButton extends createjs.Container {
  /**
   * Constructor for the SpinButton widget.
   * 
   * @param {Object} options - Configuration options for the spin button
   * @param {number} options.maxValue - Maximum allowed value
   * @param {number} options.minValue - Minimum allowed value
   * @param {number} options.width - Width of the spin button in pixels
   * @param {number} options.height - Height of the spin button in pixels
   * @param {createjs.Text} textContainer - Text object that displays the current value
   * @param {Function} callback - Function called when the value changes
   */
  constructor({ options, textContainer, callback }) {
    super();
    
    // Extract configuration values from options
    const { maxValue, minValue } = options;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.targetContainer = textContainer;
    this.callback = callback;

    // Store dimensions for getter methods
    this._width = options.width;
    this._height = options.height;
    
    // Initialize current value from text container and ensure it's numeric
    this.currentValue = Number(textContainer.text);
    textContainer.text = this.currentValue;

    // Register with accessibility module to provide ARIA spinbutton functionality
    AccessibilityModule.register({
      accessibleOptions: {
        max: maxValue,
        min: minValue,
        readOnly: false, // Allow user input
        required: true, // Value must be provided
        tabIndex: 0, // Make focusable via keyboard navigation
        value: this.currentValue, // Current numeric value
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

    // Set container bounds for proper layout
    this.setBounds(0, 0, this.width, this.height);
    
    // Create visual focus indicator
    this.setupFocusIndicator(this.width, this.height);
    
    // Create increment and decrement buttons
    this.createButtons();
  }

  /**
   * Creates the increment and decrement buttons for the spin button.
   * 
   * The buttons are positioned vertically - increment on top, decrement on bottom.
   * Both buttons share the same width as the spin button and half the height each.
   */
  createButtons() {
    // Configuration for button creation
    const options = {
      type: 'button',
      value: '+', // Will be changed for decrement button
      name: 'Increment', // Will be changed for decrement button
      enabled: true,
      autoFocus: true,
      width: this.width,
      height: this.height * 0.5, // Each button takes half the height
    };
    
    // Create increment button with '+' symbol
    this.incBtn = new Button(options, 0, this.onIncrement.bind(this));
    this.addChild(this.incBtn);

    // Create decrement button with '-' symbol, positioned below increment button
    options.value = '-';
    options.name = 'Decrement';
    this.decBtn = new Button(options, 0, this.onDecrement.bind(this));
    this.addChild(this.decBtn);
    this.decBtn.y = this.height * 0.5; // Position below increment button
  }

  /**
   * Handles increment event - increases the current value by 1.
   * 
   * Respects the maximum value constraint. If incrementing would exceed max,
   * the value is set to the maximum instead.
   */
  onIncrement() {
    this.currentValue =
      this.currentValue + 1 > this.maxValue
        ? this.maxValue
        : this.currentValue + 1;
    this.updateTargetValue();
  }

  /**
   * Handles decrement event - decreases the current value by 1.
   * 
   * Respects the minimum value constraint. If decrementing would go below min,
   * the value is set to the minimum instead.
   */
  onDecrement() {
    this.currentValue =
      this.currentValue - 1 < this.minValue
        ? this.minValue
        : this.currentValue - 1;
    this.updateTargetValue();
  }

  /**
   * Handles change event from accessibility module.
   * 
   * Updates the current value to the new value provided in the event.
   * 
   * @param {Object} evt - Change event object containing the new value
   * @param {number} evt.value - The new numeric value
   */
  onChange(evt) {
    this.currentValue = evt.value;
    this.updateTargetValue();
  }

  /**
   * Updates the target text container and accessibility value.
   * 
   * Sets the text of the associated text container to the current value,
   * updates the accessible value for screen readers, and calls the callback
   * function to notify listeners of the value change.
   */
  updateTargetValue() {
    this.targetContainer.text = this.currentValue;
    this.accessible.value = this.currentValue;
    this.callback();
  }

  /**
   * Creates and configures the visual focus indicator.
   * 
   * The focus indicator is a blue rectangle outline that appears when
   * the spin button receives focus, providing visual feedback for keyboard navigation.
   * 
   * @param {number} width - Width of the focus indicator
   * @param {number} height - Height of the focus indicator
   */
  setupFocusIndicator(width, height) {
    this._focusIndicator = new createjs.Shape();
    this._focusIndicator.visible = false; // Initially hidden
    
    // Draw blue rectangle outline slightly larger than the button
    this._focusIndicator.graphics
      .setStrokeStyle(5) // 5px stroke width
      .beginStroke('#5FC1FA') // Light blue color
      .drawRect(-2.5, -2.5, width + 5, height + 5); // Offset to center the stroke
    
    this.addChild(this._focusIndicator);
  }

  /**
   * Handles focus event - shows the focus indicator.
   * 
   * Called when the spin button receives keyboard focus.
   */
  onFocus() {
    this._focusIndicator.visible = true;
  }

  /**
   * Handles blur event - hides the focus indicator.
   * 
   * Called when the spin button loses keyboard focus.
   */
  onBlur() {
    this._focusIndicator.visible = false;
  }

  /**
   * Gets the width of the spin button.
   * 
   * @returns {number} The width in pixels
   */
  get width() {
    return this._width;
  }

  /**
   * Gets the height of the spin button.
   * 
   * @returns {number} The height in pixels
   */
  get height() {
    return this._height;
  }
}
