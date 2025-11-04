import _ from 'lodash';
import KeyCodes from 'keycodes-enum';
import AccessibilityModule from '@curriculumassociates/createjs-accessibility';
import SingleLineTextInput from './SingleLineTextInput';

/**
 * A combobox component that combines a text input with a dropdown list.
 * This implementation supports both free text entry and selection from a predefined list,
 * making it flexible for various use cases. The component is fully accessible with 
 * keyboard navigation and screen reader support.
 */
export default class ComboBox extends createjs.Container {
  /**
   * Creates a new ComboBox instance
   * @param {Array} options - Array of options to display in the dropdown
   * @param {number} width - Width of the combobox
   * @param {number} height - Height of the combobox
   * @param {number} tabIndex - Tab order index for keyboard navigation
   */
  constructor(options, width, height, tabIndex) {
    super();
    _.bindAll(
      this,
      '_onCollapedViewClick',
      '_onCollapedViewKeyDown',
      '_onCollapedViewChange',
      '_onOptionClick',
      '_onDropDownViewBlur',
      '_onDropDownKeyDown',
      '_onValueChanged'
    );
    // Register with accessibility module for screen reader and keyboard support
    AccessibilityModule.register({
      displayObject: this,
      role: AccessibilityModule.ROLES.COMBOBOX,
      accessibleOptions: {
        expanded: false,
      },
    });

    this._options = options;

    this._createCollapsedView(width, height, tabIndex);
    this._createDropDownView(width, height);
    // Link the textbox with the dropdown for accessibility
    this._textBox.accessible.controls = this._dropDownView;
    this._dropDownView.visible = false;
  }

  /**
   * Sets whether the combobox can receive keyboard focus
   * @param {boolean} tabbable - Whether the combobox should be focusable
   */
  setTabbable(tabbable) {
    if (tabbable) {
      this._textBox.accessible.tabIndex = 0;
    } else {
      this._textBox.accessible.tabIndex = -1;
    }
  }

  /**
   * Gets the current text value of the combobox
   * @returns {string} The current text in the input field
   */
  get text() {
    return this._textBox.text;
  }

  /**
   * Sets the text value of the combobox
   * @param {string} str - The text to set
   */
  set text(str) {
    this._textBox.text = str;
  }

  /**
   * Creates the collapsed (default) view of the combobox
   * This includes a text input field and a dropdown arrow button
   * @private
   */
  _createCollapsedView(width, height, tabIndex) {
    // Calculate text box width to accommodate the dropdown arrow
    const textBoxWidth = width - height;

    // Create and setup the text input component
    this._textBox = new SingleLineTextInput(textBoxWidth, height, tabIndex);
    this._textBox.enableKeyEvents = true;
    this._textBox.addEventListener('keydown', this._onCollapedViewKeyDown);
    this._textBox.addEventListener('valueChanged', this._onCollapedViewChange);
    this._textBox.accessible.enableKeyEvents = true;
    this.addChild(this._textBox);
    this.accessible.addChild(this._textBox);

    // Create the dropdown arrow button
    this._arrow = new createjs.Shape();
    // Create grey background for the arrow button
    this._arrow.graphics.beginFill('#aaaaaa').drawRect(0, 0, height, height);
    // Draw the arrow symbol
    this._arrow.graphics
      .endFill()
      .beginStroke('#000000')
      .moveTo(height * 0.25, height * 0.25)
      .lineTo(height * 0.5, height * 0.75)
      .lineTo(height * 0.75, height * 0.25);
    // Add button border
    this._arrow.graphics
      .beginStroke('#000000')
      .setStrokeStyle(1)
      .drawRect(0, 0, height, height);
    this._arrow.x = width - height;

    // Register the arrow button with accessibility features
    AccessibilityModule.register({
      displayObject: this._arrow,
      role: AccessibilityModule.ROLES.BUTTON,
      accessibleOptions: {
        tabIndex: -1,
      },
    });
    this._arrow.addEventListener('click', this._onCollapedViewClick);
    this._arrow.addEventListener('keyboardClick', this._onCollapedViewClick);
    this.addChild(this._arrow);
    this.accessible.addChild(this._arrow);
  }

  /**
   * Handles clicks on the collapsed view (mainly the dropdown arrow)
   * Toggles the visibility of the dropdown list
   * @private
   */
  _onCollapedViewClick(evt) {
    this._textBox.accessible.requestFocus();
    this._dropDownView.visible = !this._dropDownView.visible;
    this.accessible.expanded = this._dropDownView.visible;
    if (this._dropDownView.visible) {
      // Ensure dropdown is visible by bringing it to the front
      this.parent.addChild(this);
    } else {
      this._textBox.accessible.active = undefined;
    }

    evt.stopPropagation();
    evt.preventDefault();
  }

  /**
   * Handles keyboard events in the collapsed view
   * Supports up/down arrow keys for dropdown navigation
   * @private
   */
  _onCollapedViewKeyDown(evt) {
    if (evt.keyCode === KeyCodes.down || evt.keyCode === KeyCodes.up) {
      this._dropDownView.visible = true;
      this.accessible.expanded = true;

      // Ensure dropdown is visible by bringing it to the front
      this.parent.addChild(this);

      this._dropDownView.accessible.requestFocus();
      this._updateSelectedOption(
        this._getAdjacentOption(evt.keyCode === KeyCodes.down)
      );

      evt.stopPropagation();
      evt.preventDefault();
    }
  }

  /**
   * Gets the next or previous option in the dropdown list
   * @param {boolean} next - True to get next option, false for previous
   * @returns {Object} The adjacent option object
   * @private
   */
  _getAdjacentOption(next) {
    let index = _.findIndex(this._options, (child) => child.selected);
    if (next) {
      index = Math.min(index + 1, this._options.length - 1);
    } else {
      index = Math.max(index - 1, 0);
    }

    return this._options[index];
  }

  /**
   * Updates the selected option in the dropdown
   * Updates the text input and accessibility properties
   * @param {Object} option - The option to select
   * @private
   */
  _updateSelectedOption(option) {
    this._options.forEach((opt) => {
      opt.selected = false;
    });
    option.selected = true;

    this.text = option._label.text;

    this._dropDownView.accessible.active = option;
    this._dropDownView.accessible.selected = option;
  }

  /**
   * Handles changes to the input text
   * Updates option selection if text matches an option
   * @private
   */
  _onCollapedViewChange(evt) {
    _.forEach(this._options, (opt) => {
      opt.selected = false;
    });
    const matchingOption = _.find(
      this._options,
      (option) => option.value === evt.newValue
    );
    if (matchingOption) {
      matchingOption.selected = true;
    }
  }

  /**
   * Creates the dropdown view containing the list of options
   * Sets up the container, background, and options list
   * @private
   */
  _createDropDownView(width, optionHeight) {
    this._dropDownView = new createjs.Container();
    this._dropDownView.y = optionHeight;
    this._dropDownView.visible = false;
    this.addChild(this._dropDownView);

    // Register dropdown with accessibility features
    AccessibilityModule.register({
      displayObject: this._dropDownView,
      role: AccessibilityModule.ROLES.SINGLESELECTLISTBOX,
      parent: this,
      accessibleOptions: {
        tabIndex: -1,
      },
    });
    this._dropDownView.accessible.enableKeyEvents = true;
    this._dropDownView.addEventListener('keydown', this._onDropDownKeyDown);
    this._dropDownView.addEventListener('valueChanged', this._onValueChanged);
    this._dropDownView.addEventListener('blur', this._onDropDownViewBlur);

    // Create dropdown background
    const bg = new createjs.Shape();
    bg.graphics
      .beginStroke('#000000')
      .setStrokeStyle(1)
      .beginFill('#ffffff')
      .drawRect(0, 0, width, optionHeight * this._options.length);
    this._dropDownView.addChild(bg);

    // Add options to the dropdown
    this._options.forEach((option, i) => {
      option.y = optionHeight * i;
      option.addEventListener('click', this._onOptionClick);
      this._dropDownView.addChild(option);
      this._dropDownView.accessible.addChild(option);
    });
  }

  /**
   * Handles clicks on dropdown options
   * Updates the text input and closes the dropdown
   * @private
   */
  _onOptionClick(evt) {
    this._textBox.text = evt.currentTarget._label.text;
    this._onCollapedViewClick(evt);
  }

  /**
   * Handles blur events on the dropdown
   * Closes the dropdown when focus is lost
   * @private
   */
  _onDropDownViewBlur() {
    this._dropDownView.visible = false;
    this.accessible.expanded = this._dropDownView.visible;
  }

  /**
   * Handles keyboard events in the dropdown view
   * Supports Enter to select and Escape to close
   * @private
   */
  _onDropDownKeyDown(evt) {
    if (evt.keyCode === KeyCodes.enter || evt.keyCode === KeyCodes.esc) {
      this._textBox.accessible.requestFocus();
      this._dropDownView.visible = false;
      this.accessible.expanded = this._dropDownView.visible;
      evt.preventDefault();
    }
  }

  /**
   * Handles value changes in the dropdown
   * Updates the selected option when changed
   * @private
   */
  _onValueChanged(evt) {
    this._updateSelectedOption(evt.selectedDisplayObject);
  }
}