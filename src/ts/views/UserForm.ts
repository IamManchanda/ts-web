import { EventsMapProps } from "../ts-utils/interfaces";
import { User } from "../models";

class UserForm {
  constructor(public parent: Element, public model: User) {}

  get eventsMap(): EventsMapProps {
    return {
      "click:.set-random-age": this.onSetRandomAge,
    };
  }

  onSetRandomAge = (): void => {
    this.model.setRandomAge();
  };

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
        <div>User Name: ${this.model.getAttr("name")}</div>
        <div>User Age: ${this.model.getAttr("age")}</div>
        <br />
        <input />
        <button>Click me</button>
        <button class="set-random-age">Set Random Age</button>
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
