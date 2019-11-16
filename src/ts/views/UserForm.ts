import { EventsMapProps } from "../ts-utils/interfaces";

class UserForm {
  constructor(public parent: Element) {}

  get eventsMap(): EventsMapProps {
    return {
      "mouseover:h1": this.onHeaderMouseover,
      "mouseout:h1": this.onHeaderMouseout,
      "click:button": this.onButtonClick,
    };
  }

  onHeaderMouseover(): void {
    console.log("Header Mouseover'ed!");
  }

  onHeaderMouseout(): void {
    console.log("Header Mouseout'ed!");
  }

  onButtonClick(): void {
    console.log("Button Click'ed!");
  }

  bindEvents(fragment: DocumentFragment): void {
    const { eventsMap } = this;
    for (const eventKey in eventsMap) {
      if (eventsMap.hasOwnProperty(eventKey)) {
        const eventValue = eventsMap[eventKey];
        const [eventName, selector] = eventKey.split(":");
        const querySelectorFragments = element => {
          element.addEventListener(eventName, eventValue);
        };
        fragment.querySelectorAll(selector).forEach(querySelectorFragments);
      }
    }
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <input />
        <button>Click me</button>
      </div>
    `;
  }

  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    const fragment: DocumentFragment = templateElement.content;
    this.bindEvents(fragment);
    this.parent.append(fragment);
  }
}

export default UserForm;
