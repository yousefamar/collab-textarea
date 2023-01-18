import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc';
import { TextAreaBinding } from 'y-textarea-names'

function getRandomAnimalName() {
  const animalNames = [
    "Lion", "Tiger", "Bear", "Elephant", "Giraffe", "Zebra", "Hippo", "Rhino", "Crocodile", "Gorilla",
    "Puma", "Leopard", "Cheetah", "Jaguar", "Ocelot", "Cougar", "Bobcat", "Lynx", "Caracal", "Serval",
    "Kangaroo", "Koala", "Wombat", "Echidna", "Platypus", "Wallaby", "Kookaburra", "Emu", "Cassowary", "Cockatoo",
    "Penguin", "Albatross", "Ostrich", "Flamingo", "Heron", "Eagle", "Hawk", "Osprey", "Kestrel", "Falcon",
    "Beaver", "Otter", "Squirrel", "Chipmunk", "Raccoon", "Skunk", "Opossum", "Badger", "Armadillo", "Pangolin",
    "Iguana", "Chameleon", "Gecko", "Crocodile", "Alligator", "Tortoise", "Lizard", "Dragon", "Python", "Anaconda"
  ];
  return animalNames[Math.floor(Math.random() * animalNames.length)];
}

function getLightColor() {
  return {
    r: 100 + Math.floor(Math.random() * 155),
    g: 100 + Math.floor(Math.random() * 155),
    b: 100 + Math.floor(Math.random() * 155),
  }
}

export default class CollabTextArea extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<textarea></textarea>
    <style>
      .nameTag {
        padding: 2px 4px;
        color: var(--background-body, black);
        font-weight: bold;
      }
    </style>`;
    this.$textarea = this.querySelector("textarea");

    const ydoc = new Y.Doc();
    const provider = window.provider = new WebrtcProvider(window.location.origin + window.location.pathname, ydoc);
    const yTextArea = ydoc.getText('textArea');
    this.textAreaBindingOptions = {
      awareness: provider.awareness,
      clientName: getRandomAnimalName(),
      color: getLightColor(),
    };
    const textAreaBinding = window.textAreaBinding = new TextAreaBinding(yTextArea, this.$textarea, this.textAreaBindingOptions);
  }

  static get observedAttributes() {
    return ['username'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal !== newVal)
      this.textAreaBindingOptions.clientName = newVal;
  }

  get value() {
    return this.$textarea.value;
  }

  set value(val) {
    this.$textarea.value = val;
  }

  get username() {
    return this.textAreaBindingOptions.clientName;
  }
  set username(newVal) {
    this.textAreaBindingOptions.clientName = newVal;
  }
}

customElements.define('collab-textarea', CollabTextArea);