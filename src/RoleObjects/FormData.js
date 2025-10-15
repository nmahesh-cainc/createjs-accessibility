import SectionData from './SectionData';

/**
 * Data structure for a form role.
 * Forms are used to collect user input and submit it to a server.
 * This class extends SectionData to provide form-specific properties
 * that map to HTML form attributes, enabling proper form submission
 * and validation behavior in the accessibility layer.
 *
 * @extends SectionData
 */
export default class FormData extends SectionData {
  /**
   * Sets the character encoding that the server can accept for form submission.
   * This specifies the character encodings that the server processing the form
   * will accept. Common values include "UTF-8", "ISO-8859-1", etc.
   * The value is mapped to the HTML form's "accept-charset" attribute via
   * the acceptCharset React prop.
   *
   * @access public
   * @param {String} str - character encoding to use (e.g., "UTF-8", "ISO-8859-1")
   */
  set charSet(str) {
    // Maps to the acceptCharset React prop, which corresponds to the
    // accept-charset HTML attribute (note the camelCase conversion)
    this._reactProps.acceptCharset = str;
  }

  /**
   * Retrieves the character encoding that the server can accept for form submission.
   * Returns the value that was set via the charSet setter, which specifies
   * what character encodings the form submission handler on the server will accept.
   *
   * @access public
   * @returns {String} character encoding used, or undefined if not set
   */
  get charSet() {
    return this._reactProps.acceptCharset;
  }

  /**
   * Sets the URL where the form data should be sent when the form is submitted.
   * This is the server endpoint that will process the form submission.
   * The URL can be absolute (e.g., "https://example.com/submit") or
   * relative to the current page (e.g., "/submit" or "process.php").
   * If not set, the form will submit to the same URL as the current page.
   *
   * @access public
   * @param {String} str - form submission URL (absolute or relative)
   */
  set action(str) {
    this._reactProps.action = str;
  }

  /**
   * Retrieves the URL where the form data will be sent when submitted.
   * Returns the server endpoint that has been configured to receive
   * and process the form submission.
   *
   * @access public
   * @returns {String} form submission URL, or undefined if not set
   */
  get action() {
    return this._reactProps.action;
  }

  /**
   * Sets whether the form should have autocomplete enabled or not.
   * When enabled, the browser can suggest previously entered values
   * to help users fill out the form more quickly. When disabled,
   * the browser will not offer autocomplete suggestions.
   *
   * Note: This method converts the boolean parameter to the string values
   * 'on' or 'off' as required by the HTML autocomplete attribute.
   *
   * @access public
   * @param {boolean} enable - true to enable autocomplete suggestions,
   *                          false to disable them
   */
  set autoComplete(enable) {
    // Convert boolean to 'on'/'off' string as required by HTML autocomplete attribute
    this._reactProps.autoComplete = enable ? 'on' : 'off';
  }

  /**
   * Retrieves whether autocomplete is enabled or not for the form.
   * The autocomplete feature is enabled by default in HTML forms if not specified,
   * so this getter returns true when the value is undefined or explicitly set to 'on'.
   *
   * Note: This method converts the internal string representation ('on'/'off')
   * back to a boolean for easier consumption by calling code.
   *
   * @access public
   * @returns {boolean} true if autocomplete is enabled (either by default or explicitly),
   *                   false if autocomplete is explicitly disabled
   */
  get autoComplete() {
    // Autocomplete is enabled by default if undefined, or explicitly set to 'on'
    return (
      this._reactProps.autoComplete === undefined ||
      this._reactProps.autoComplete === 'on'
    );
  }

  /**
   * Sets how form data should be encoded when sending to the server.
   * This attribute is only used when the HTTP method is "post".
   *
   * Common values include:
   * - "application/x-www-form-urlencoded" (default): Standard encoding for most forms
   * - "multipart/form-data": Required when uploading files
   * - "text/plain": Sends data without encoding (rarely used)
   *
   * The value is mapped to the encType React prop (note the camelCase conversion).
   *
   * @access public
   * @param {String} str - MIME type for encoding the form data
   *                      (e.g., "multipart/form-data", "application/x-www-form-urlencoded")
   */
  set enctype(str) {
    // Maps to encType React prop, which sets the HTML enctype attribute
    this._reactProps.encType = str;
  }

  /**
   * Retrieves how form data should be encoded when sending to the server.
   * Returns the MIME type that specifies the encoding format for form submissions.
   * This value only affects form submission when the HTTP method is "post".
   *
   * @access public
   * @returns {String} encoding type MIME string, or undefined if not set
   *                  (browser will use default "application/x-www-form-urlencoded")
   */
  get enctype() {
    return this._reactProps.encType;
  }

  /**
   * Sets the HTTP method to use for sending form data to the server.
   * The method determines how the form data is transmitted:
   *
   * - "get" (default): Appends form data to the URL as query parameters.
   *   Suitable for non-sensitive data and when the submission doesn't change server state.
   *   Has URL length limitations.
   *
   * - "post": Sends form data in the HTTP request body. Suitable for sensitive data,
   *   large amounts of data, or when the submission changes server state (e.g., database updates).
   *
   * - "dialog": Used when the form is inside a dialog element (HTML5 feature).
   *
   * @access public
   * @param {String} str - HTTP method ("get", "post", or "dialog")
   */
  set method(str) {
    this._reactProps.method = str;
  }

  /**
   * Retrieves the HTTP method that will be used for sending form data.
   * Returns the configured transmission method for the form submission.
   *
   * @access public
   * @returns {String} HTTP method (e.g., "get", "post"), or undefined if not set
   *                  (browser will use default "get" method)
   */
  get method() {
    return this._reactProps.method;
  }

  /**
   * Sets the name identifier for the form.
   * The name is used to:
   * 1. Reference the form in JavaScript (e.g., document.forms['formName'])
   * 2. Identify the form in server-side processing
   * 3. Differentiate between multiple forms on the same page
   *
   * Note: The name is different from the id attribute. Multiple elements
   * can share the same name, but ids must be unique across the document.
   *
   * @access public
   * @param {String} str - name identifier for the form
   */
  set name(str) {
    this._reactProps.name = str;
  }

  /**
   * Retrieves the name identifier of the form.
   * Returns the name that can be used to reference this form
   * in JavaScript or identify it during server-side processing.
   *
   * @access public
   * @returns {String} name of the form, or undefined if not set
   */
  get name() {
    return this._reactProps.name;
  }

  /**
   * Sets whether the form should be validated when submitted.
   * When validation is enabled (true), the browser will check form fields
   * for validity (e.g., required fields, email format, min/max values)
   * before allowing submission. When disabled (false), the form will
   * submit without client-side validation checks.
   *
   * Note: This method inverts the boolean because the underlying HTML attribute
   * is "novalidate" (presence means no validation), but this API exposes it as
   * "validate" (true means validation enabled) for a more intuitive interface.
   *
   * @access public
   * @param {boolean} enable - true to enable form validation before submission,
   *                          false to skip validation and allow immediate submission
   */
  set validate(enable) {
    // Invert the value: validate=true maps to novalidate=false (validation enabled)
    // validate=false maps to novalidate=true (validation disabled)
    this._reactProps.novalidate = !enable;
  }

  /**
   * Retrieves whether the form should be validated when submitted.
   * Returns true if the browser will perform validation checks on form fields
   * before submission, or false if validation is bypassed.
   *
   * Note: This method inverts the underlying "novalidate" property to provide
   * a more intuitive API. When novalidate is false (or undefined), validation
   * is enabled, so this getter returns true.
   *
   * @access public
   * @returns {boolean} true if form validation is enabled (default behavior),
   *                   false if validation is explicitly disabled
   */
  get validate() {
    // Invert the internal novalidate value to return the validation state
    return !this._reactProps.novalidate;
  }

  /**
   * Sets where to display the response received after submitting the form.
   * This determines which browsing context (window, tab, or frame) will
   * show the server's response to the form submission.
   *
   * Common values include:
   * - "_self" (default): Display in the same browsing context as the form
   * - "_blank": Display in a new window or tab
   * - "_parent": Display in the parent frame (if the form is in an iframe)
   * - "_top": Display in the topmost browsing context (breaks out of all frames)
   * - Custom frame name: Display in the frame/iframe with the specified name
   *
   * @access public
   * @param {String} str - browsing context name where the response should be displayed
   *                      (e.g., "_blank", "_self", "_parent", "_top", or a frame name)
   */
  set target(str) {
    this._reactProps.target = str;
  }

  /**
   * Retrieves where the response from form submission will be displayed.
   * Returns the browsing context (window, tab, or frame) that has been
   * configured to show the server's response after the form is submitted.
   *
   * @access public
   * @returns {String} target browsing context name, or undefined if not set
   *                  (browser will use default "_self" behavior)
   */
  get target() {
    return this._reactProps.target;
  }
}
