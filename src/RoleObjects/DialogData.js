import AccessibilityObject from './AccessibilityObject';

export default class DialogData extends AccessibilityObject {
  /**
   * Sets whether the dialog element is expanded or collapsed.
   * When expanded, the dialog's content is visible to the user.
   * @access public
   * @param {boolean} val - true if expanded, false if not expanded, undefined if the field is unset
   */
  set expanded(val) {
    this._reactProps['aria-expanded'] = val;
  }

  /**
   * Retrieves whether the dialog element is expanded or collapsed.
   * Checks the 'aria-expanded' property in the underlying React props.
   * @access public
   * @returns {boolean} true if expanded, false if not expanded, undefined if the field is unset
   */
  get expanded() {
    return this._reactProps['aria-expanded'];
  }
}
