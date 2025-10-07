import { ROLES } from '../Roles';
import SelectData from './SelectData';

export default class ComboBoxData extends SelectData {
  /**
   * Adds a child display object to the ComboBox.
   * Only allows children with specific roles that are valid for a ComboBox (e.g., textbox, search, button, etc.).
   * Throws an error if the child does not have an allowed role.
   * Calls the parent class's addChild method if valid.
   * @inheritdoc
   */
  addChild(displayObject) {
    if (
      !displayObject.accessible ||
      (displayObject.accessible.role !== ROLES.SINGLELINETEXTBOX &&
        displayObject.accessible.role !== ROLES.SEARCH &&
        displayObject.accessible.role !== ROLES.BUTTON &&
        displayObject.accessible.role !== ROLES.SINGLESELECTLISTBOX &&
        displayObject.accessible.role !== ROLES.TREE &&
        displayObject.accessible.role !== ROLES.GRID &&
        displayObject.accessible.role !== ROLES.DIALOG)
    ) {
      throw new Error(
        `Children of ${this.role} must have a role of ${ROLES.SINGLELINETEXTBOX}, ${ROLES.SEARCH}, ${ROLES.BUTTON}, ${ROLES.SINGLESELECTLISTBOX}, ${ROLES.TREE}, ${ROLES.GRID}, or ${ROLES.DIALOG}`
      );
    }
    super.addChild(displayObject);
  }

  /**
   * Adds a child display object to the ComboBox at a specific index.
   * Only allows children with specific roles that are valid for a ComboBox (e.g., textbox, search, button, etc.).
   * Throws an error if the child does not have an allowed role.
   * Calls the parent class's addChildAt method if valid.
   * @inheritdoc
   */
  addChildAt(displayObject, index) {
    if (
      !displayObject.accessible ||
      (displayObject.accessible.role !== ROLES.SINGLELINETEXTBOX &&
        displayObject.accessible.role !== ROLES.SEARCH &&
        displayObject.accessible.role !== ROLES.BUTTON &&
        displayObject.accessible.role !== ROLES.SINGLESELECTLISTBOX &&
        displayObject.accessible.role !== ROLES.TREE &&
        displayObject.accessible.role !== ROLES.GRID &&
        displayObject.accessible.role !== ROLES.DIALOG)
    ) {
      throw new Error(
        `Children of ${this.role} must have a role of ${ROLES.SINGLELINETEXTBOX}, ${ROLES.SEARCH}, ${ROLES.BUTTON}, ${ROLES.SINGLESELECTLISTBOX}, ${ROLES.TREE}, ${ROLES.GRID}, or ${ROLES.DIALOG}`
      );
    }
    super.addChildAt(displayObject, index);
  }

  /**
   * Enables or disables the autocomplete feature for the ComboBox.
   * When enabled, the browser may suggest or automatically complete user input based on previous entries.
   * Sets the 'autoComplete' property in the underlying React props to 'on' or 'off'.
   * @access public
   * @param {boolean} enable - true to enable autocomplete, false to disable.
   */
  set autoComplete(enable) {
    this._reactProps.autoComplete = enable ? 'on' : 'off';
  }

  /**
   * Returns whether autocomplete is enabled for the ComboBox.
   * Checks the 'autoComplete' property in the underlying React props.
   * Returns true if autocomplete is enabled (either by default or explicitly), false otherwise.
   * @access public
   * @returns {boolean} true if autocomplete is enabled, false otherwise.
   */
  get autoComplete() {
    return (
      this._reactProps.autoComplete === undefined ||
      this._reactProps.autoComplete === 'on'
    );
  }

  /**
   * Sets the expanded state of the ComboBox.
   * When expanded, the ComboBox's options are visible to the user.
   * Sets the 'aria-expanded' property in the underlying React props.
   * @access public
   * @param {boolean} val - true if expanded, false if collapsed, undefined if unset.
   */
  set expanded(val) {
    this._reactProps['aria-expanded'] = val;
  }

  /**
   * Returns the expanded state of the ComboBox.
   * Checks the 'aria-expanded' property in the underlying React props.
   * Returns true if expanded, false if collapsed, undefined if unset.
   * @access public
   * @returns {boolean|undefined} true if expanded, false if collapsed, undefined if unset.
   */
  get expanded() {
    return this._reactProps['aria-expanded'];
  }

  /**
   * Sets the read-only state of the ComboBox.
   * When set to true, the ComboBox cannot be edited by the user.
   * Sets the 'aria-readonly' property in the underlying React props.
   * @access public
   * @param {boolean} value - true to make read-only, false to make editable.
   */
  set readOnly(value) {
    this._reactProps['aria-readonly'] = value;
  }

  /**
   * Returns the read-only state of the ComboBox.
   * Checks the 'aria-readonly' property in the underlying React props.
   * Returns true if read-only, false if editable.
   * @access public
   * @returns {boolean} true if read-only, false if editable.
   */
  get readOnly() {
    return this._reactProps['aria-readonly'];
  }

  /**
   * Sets whether user input is required for the ComboBox.
   * When set to true, the ComboBox must be filled out before submitting a form.
   * Sets the 'aria-required' property in the underlying React props.
   * @access public
   * @param {boolean} value - true if required, false otherwise.
   */
  set required(value) {
    this._reactProps['aria-required'] = value;
  }

  /**
   * Returns whether user input is required for the ComboBox.
   * Checks the 'aria-required' property in the underlying React props.
   * Returns true if required, false otherwise.
   * @access public
   * @returns {boolean} true if required, false otherwise.
   */
  get required() {
    return this._reactProps['aria-required'];
  }
}
