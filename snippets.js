class ButtonPrimary extends HTMLElement {
  constructor() {
    super();
    //...
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }

  set disabled(val) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
}

customElements.define("component-name", ButtonPrimary);
/*
class FancyButton extends HTMLButtonElement {
  constructor() {
    super();
    //...
  }
}

customElements.define("fancy-button", FancyButton, { extends: "button" });

<ButtonPrimary large disabled>
  Button
</ButtonPrimary>;

const button = document.querySelector("button-primary");
button.large = true;
button.disabled = true;
*/
