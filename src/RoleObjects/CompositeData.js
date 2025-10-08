import AccessibilityObject from './AccessibilityObject';

export default class CompositeData extends AccessibilityObject {
  /**
   * Sets the currently active descendant of a composite widget.
   * This method updates the `aria-activedescendant` property, which is used by assistive technologies
   * to indicate which child element of a composite widget (such as a listbox, tree, or grid) is currently active.
   * If a DisplayObject is provided, it must have accessibility information attached; otherwise, an error is thrown.
   * Passing `undefined` will unset the active descendant, removing the association from the widget.
   *
   * @access public
   * @param {createjs.DisplayObject} displayObject - The DisplayObject to set as the active descendant. If undefined, the active descendant is unset.
   */
  set active(displayObject) {
    if (displayObject && !displayObject.accessible) {
      throw new Error(
        'DisplayObject being set as the active descendant must have accessibility information'
      );
    }
    this._active = displayObject;
    this._reactProps['aria-activedescendant'] = displayObject
      ? displayObject.accessible.domId
      : undefined;
  }

  /**
  /**
  * Gets the current active descendant DisplayObject for this composite widget.
  * This is the DisplayObject that has been set as active, typically representing the item
  * that is currently focused or selected within the widget for accessibility purposes.
  *
  * @access public
  * @returns {createjs.DisplayObject} The DisplayObject that is the current active descendant, or undefined if none is set.
  */
  get active() {
    return this._active;
  }

  /**
  /**
  * Gets the DOM id of the currently active descendant DisplayObject.
  * This value is used to set the `aria-activedescendant` attribute on the composite widget's DOM node,
  * allowing assistive technologies to track which child element is active.
  *
  * @access public
  * @returns {String} The DOM id of the active descendant DisplayObject, or undefined if none is set.
  */
  get activeId() {
    return this._reactProps['aria-activedescendant'];
  }
}
