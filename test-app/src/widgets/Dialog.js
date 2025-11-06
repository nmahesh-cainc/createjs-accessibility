// Import the CreateJS Accessibility Module to enable screen reader and keyboard navigation support for interactive elements
import AccessibilityModule from '@curriculumassociates/createjs-accessibility';
// Import the Button component for creating interactive button elements within the dialog
import Button from './Button';
// Import the Link component for creating accessible hyperlink elements
import Link from './Link';

// Dialog class extends CreateJS Container to create an accessible modal dialog box
export default class Dialog extends createjs.Container {
  // Constructor initializes the dialog with specified dimensions, button data, and accessibility features
  // Parameters:
  // btnData: Object containing data for the close button (name, etc.)
  // width: Numeric width of the dialog in pixels
  // height: Numeric height of the dialog in pixels  
  // tabIndex: Numeric tab index for keyboard navigation order
  constructor(btnData, width, height, tabIndex) {
    super();
    // Store dialog dimensions for later use
    this.height = height;
    this.width = width;
    // Initially hide the dialog until explicitly shown
    this.visible = false;
    // Register this container as an ARIA dialog role for screen readers
    AccessibilityModule.register({
      displayObject: this,
      role: AccessibilityModule.ROLES.DIALOG,
    });

    // Define the bounding box for the dialog container
    this.setBounds(0, 0, this.width, this.height);

    // Create a rectangular background shape with border and fill
    const background = new createjs.Shape();
    background.graphics
      .beginStroke('black')
      .beginFill('#ccc')
      .drawRect(0, 0, this.width, this.height);
    this.addChild(background);

    // Create and position the main title text of the dialog
    const titleText = new createjs.Text(
      'Createjs Accessibility Tester',
      'bold 32px Arial',
      '#000'
    );
    titleText.x = 10;
    titleText.y = 10;
    this.addChild(titleText);
    // Register title as a level 1 heading for screen readers
    AccessibilityModule.register({
      displayObject: titleText,
      parent: this,
      role: AccessibilityModule.ROLES.HEADING1,
      accessibleOptions: {
        text: titleText.text,
      },
    });
    // Set the dialog's accessible label to reference the title
    this.accessible.labelledBy = titleText;

    // Create and position descriptive text explaining the webapp's purpose
    const descriptionText = new createjs.Text(
      'A webapp to test the Createjs Accessibility Module and provide a reference implementation for its usage',
      'bold 18px Arial',
      '#000'
    );
    descriptionText.x = titleText.x;
    descriptionText.y = titleText.y + 50;
    descriptionText.lineWidth = this.width - 20;
    this.addChild(descriptionText);
    // Register description as presentational content (no specific role)
    AccessibilityModule.register({
      displayObject: descriptionText,
      parent: this,
      role: AccessibilityModule.ROLES.NONE,
      accessibleOptions: {
        text: descriptionText.text,
      },
    });
    // Set the dialog's accessible description to reference this text
    this.accessible.describedBy = descriptionText;

    // Create text for the term 'Accessibility' to be defined
    const accessibilityTerm = new createjs.Text(
      'Accessibility',
      'bold 18px Arial',
      '#000'
    );
    accessibilityTerm.x = 10;
    accessibilityTerm.y = 130;
    this.addChild(accessibilityTerm);

    // Define the accessibility term with its full explanation
    const definition =
      'Accessibility is the design of products, devices, services, or environments for people with disabilities. The concept of accessible design and practice of accessible development ensures both "direct access" (i.e. unassisted) and "indirect access" meaning compatibility with a person\'s assistive technology';
    // Create the definition text with word wrapping
    const accessibilityDefinition = new createjs.Text().set({
      text: definition,
      font: '16px Arial',
      lineWidth: this.width - 20,
    });
    accessibilityDefinition.x = 10;
    accessibilityDefinition.y = accessibilityTerm.y + 30;
    this.addChild(accessibilityDefinition);
    // Register the definition text with appropriate ARIA role
    AccessibilityModule.register({
      displayObject: accessibilityDefinition,
      parent: this,
      role: AccessibilityModule.ROLES.DEFINITION,
      accessibleOptions: {
        text: accessibilityDefinition.text,
      },
    });

    // Register the term text and link it to its definition
    AccessibilityModule.register({
      displayObject: accessibilityTerm,
      parent: this,
      role: AccessibilityModule.ROLES.TERM,
      accessibleOptions: {
        name: 'Accessibility',
        labelledBy: accessibilityDefinition,
        text: accessibilityTerm.text,
      },
    });

    // Define options for the source link to Wikipedia
    const options = {
      href: 'https://en.wikipedia.org/w/index.php?title=Accessibility&oldid=865715054',
      text: 'Source link',
    };
    // Create an accessible link component
    const source = new Link(options);
    source.x = 10;
    source.y =
      accessibilityDefinition.y +
      accessibilityDefinition.getBounds().height +
      20;
    this.addChild(source);
    // Add the link to the dialog's accessible children
    this.accessible.addChild(source);

    // Define callback function to close the dialog when button is clicked
    const callBack = () => {
      this.visible = false;
      this.parent.visible = false;
    };

    // Create the close button with provided data and callback
    const button = new Button(btnData, tabIndex, callBack);
    this.addChild(button);
    // Add button to accessible children and position it
    this.accessible.addChild(button);
    button.x = this.width - button.getBounds().width * 2;
    button.y = 0;
    // Set accessible label for the button
    button.accessible.label = btnData.name;
  }
}
