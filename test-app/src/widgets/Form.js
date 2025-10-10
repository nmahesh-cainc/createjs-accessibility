import _ from 'lodash';
import AccessibilityModule from '@curriculumassociates/createjs-accessibility';
import Button from './Button';

export default class Form extends createjs.Container {
  constructor() {
    super();
    _.bindAll(this, '_onButtonClick');

    // Register the form with accessibility module
    AccessibilityModule.register({
      displayObject: this,
      role: AccessibilityModule.ROLES.FORM,
    });

    this._createFormFields();
    this._createButton();
  }

  _createFormFields() {
    const labelStyle = '16px Arial';
    const fieldSpacing = 60;
    let yPosition = 20;

    // Name field label
    const nameLabel = new createjs.Text('Name:', labelStyle);
    nameLabel.x = 20;
    nameLabel.y = yPosition;
    AccessibilityModule.register({
      displayObject: nameLabel,
      parent: this,
      role: AccessibilityModule.ROLES.NONE,
      accessibleOptions: {
        text: nameLabel.text,
      },
    });
    this.addChild(nameLabel);
    this.accessible.addChild(nameLabel);

    // Name field input (visual representation)
    const nameInput = new createjs.Shape();
    nameInput.graphics.beginStroke('black').drawRect(0, 0, 300, 40);
    nameInput.x = 150;
    nameInput.y = yPosition - 5;
    this.addChild(nameInput);

    yPosition += fieldSpacing;

    // Phone Number field label
    const phoneLabel = new createjs.Text('Phone Number:', labelStyle);
    phoneLabel.x = 20;
    phoneLabel.y = yPosition;
    AccessibilityModule.register({
      displayObject: phoneLabel,
      parent: this,
      role: AccessibilityModule.ROLES.NONE,
      accessibleOptions: {
        text: phoneLabel.text,
      },
    });
    this.addChild(phoneLabel);
    this.accessible.addChild(phoneLabel);

    // Phone Number field input (visual representation)
    const phoneInput = new createjs.Shape();
    phoneInput.graphics.beginStroke('black').drawRect(0, 0, 300, 40);
    phoneInput.x = 150;
    phoneInput.y = yPosition - 5;
    this.addChild(phoneInput);

    yPosition += fieldSpacing;

    // Address field label
    const addressLabel = new createjs.Text('Address:', labelStyle);
    addressLabel.x = 20;
    addressLabel.y = yPosition;
    AccessibilityModule.register({
      displayObject: addressLabel,
      parent: this,
      role: AccessibilityModule.ROLES.NONE,
      accessibleOptions: {
        text: addressLabel.text,
      },
    });
    this.addChild(addressLabel);
    this.accessible.addChild(addressLabel);

    // Address field input (visual representation)
    const addressInput = new createjs.Shape();
    addressInput.graphics.beginStroke('black').drawRect(0, 0, 300, 40);
    addressInput.x = 150;
    addressInput.y = yPosition - 5;
    this.addChild(addressInput);

    this._buttonYPosition = yPosition + fieldSpacing;
  }

  _createButton() {
    // Create button options
    const buttonOptions = {
      name: 'submitButton',
      value: 'Submit',
      enabled: true,
      type: 'button',
      width: 150,
      height: 50,
    };

    // Create the button instance
    this._button = new Button(buttonOptions, 0, this._onButtonClick);
    this._button.x = 150;
    this._button.y = this._buttonYPosition;

    this.addChild(this._button);
    this.accessible.addChild(this._button);
  }

  _onButtonClick() {
    // Change the button text to "Done" when clicked
    this._button.text.text = 'Click: Done';
    this._button.accessible.text = 'Click: Done';
  }
}
