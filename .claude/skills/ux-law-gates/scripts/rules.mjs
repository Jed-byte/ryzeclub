// UX-law rule registry. One entry per deterministic check in page-audit.js.
// All user-facing text is ASD-STE100 (about 80%): sentences of 20 words or fewer, active voice,
// present tense, one idea per sentence, no idioms. Use one term per concept:
//   control = a thing that a person taps (button, link, tab, chip, toggle)
//   main button = the primary action of a form, sheet or screen
//   field = a text input; label = the visible name of a field; tap area = the area that accepts a tap
// `why` gives the result for the person who uses the screen. `fix` gives one change.
// `tier`: immediate = the hook reports it on each save; advisory = only `audit` reports it.

export const RULES = [
  {
    id: 'tap-target-small', law: "Fitts's law", tier: 'immediate',
    title: 'Control is too small to tap',
    why: 'The tap area is less than 32px. People miss small controls, mostly with one hand.',
    fix: 'Make the tap area 44 x 44px or more. You can add padding and keep the icon small.',
  },
  {
    id: 'tap-target-borderline', law: "Fitts's law", tier: 'advisory',
    title: 'Control is smaller than 44px',
    why: 'The tap area is between 32px and 44px. This is satisfactory for small chips, but not for important controls.',
    fix: 'Make important or frequent controls 44px or more. Small chips can stay if the space between them is 8px or more.',
  },
  {
    id: 'primary-button-short', law: "Fitts's law", tier: 'immediate',
    title: 'Main button is too small on a phone',
    why: 'People use the main button most. A small main button is hard to tap and easy to miss.',
    fix: 'On a phone, make the main button the full width of its column. Make it 48px high or more.',
  },
  {
    id: 'input-wrong-keyboard', law: 'Forms', tier: 'immediate',
    title: 'Number field shows the letter keyboard',
    why: 'People must change the keyboard to type each number. This is slow and causes errors.',
    fix: 'Add inputmode="numeric" for codes, account numbers and card numbers. Use inputmode="decimal" for amounts and type="tel" for phone numbers.',
  },
  {
    id: 'placeholder-as-label', law: 'Forms', tier: 'immediate',
    title: 'Field has no visible label',
    why: 'The field shows its name only as placeholder text. The text goes away when people type, so they forget what the field is for.',
    fix: 'Add a visible label above the field. Connect the label to the field with for and id.',
  },
  {
    id: 'page-scrolls-sideways', law: "Jakob's law", tier: 'immediate',
    title: 'Page moves sideways on a phone',
    why: 'Phone pages do not usually move sideways. People do not see the content off the screen, and the page looks broken.',
    fix: 'Find the element that is wider than the screen. Let it wrap, become smaller, or scroll inside its own container.',
  },
  {
    id: 'label-far-from-field', law: 'Law of proximity', tier: 'immediate',
    title: 'Label is not near its field',
    why: 'The label is as near to the field above as to its own field. People can fill in the wrong field.',
    fix: 'Put 4px to 8px between a label and its field. Put two times that space or more between fields.',
  },
  {
    id: 'input-no-autocomplete', law: 'Forms', tier: 'immediate',
    title: 'Phone cannot fill in this field',
    why: 'The phone knows the name, email, phone number and card details. Without autocomplete, people must type them again.',
    fix: 'Add the correct autocomplete value, for example given-name, family-name, email, tel, cc-number, one-time-code or postal-code.',
  },
  {
    id: 'long-number-unchunked', law: "Miller's law", tier: 'immediate',
    title: 'Long number is not in groups',
    why: 'A long line of digits is hard to read and hard to check.',
    fix: 'Show the number in groups. Show IBANs and card numbers in groups of 4. Show sort codes as 00-00-00.',
  },
  {
    id: 'cta-far-from-form', law: 'Law of proximity', tier: 'immediate',
    title: 'Main button is far from the form',
    why: 'The button looks separate from the fields. After the last field, people must move far to find it.',
    fix: 'Put the main button 16px to 24px below the last field. Or keep it above the keyboard while people type.',
  },
  {
    id: 'competing-primaries', law: 'Von Restorff effect', tier: 'advisory',
    title: 'Two main buttons in one area',
    why: 'Two buttons look equally important. People stop to decide, and neither button is clear.',
    fix: 'Keep one filled button in each area. Make the other buttons outlined buttons or text buttons.',
  },
  {
    id: 'too-many-nav-options', law: "Hick's law", tier: 'advisory',
    title: 'Too many items in the bar',
    why: 'Each added item makes the choice slower. People often miss the items in the middle.',
    fix: 'Keep a tab bar or bottom bar to 5 items or fewer. Put the other items under "More".',
  },
  {
    id: 'no-enterkeyhint', law: 'Forms', tier: 'advisory',
    title: 'Return key does not show what it does',
    why: 'The return key is the nearest control while people type. People do not know if it goes to the next field or sends the form.',
    fix: 'Add enterkeyhint="next" to each field. Add enterkeyhint="done" to the last field.',
  },
  {
    id: 'disabled-submit', law: 'Forms', tier: 'advisory',
    title: 'Main button is disabled',
    why: 'People cannot continue, and the screen does not tell them why.',
    fix: 'Keep the button enabled. When people tap it, show the first field that needs a change.',
  },
  {
    id: 'no-press-feedback', law: 'Doherty threshold', tier: 'advisory',
    title: 'Controls do not change when tapped',
    why: 'People do not know if the tap worked. They tap again.',
    fix: 'Add an :active style to buttons and rows. For example, make them a little darker or 2% smaller.',
  },
];

export const RULES_BY_ID = Object.fromEntries(RULES.map(r => [r.id, r]));
