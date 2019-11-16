import { EventsMapProps } from "../ts-utils/interfaces";
import { User } from "../models";

class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  get eventsMap(): EventsMapProps {
    return {
      "click:.set-name": this.onSetName,
      "click:.set-random-age": this.onSetRandomAge,
    };
  }

  onSetName = (): void => {
    const input = this.parent.querySelector("input");
    const newName = input.value;
    this.model.setName(newName);
  };

  onSetRandomAge = (): void => {
    this.model.setRandomAge();
  };

  bindModel() {
    const handleModelChange = () => {
      this.render();
    };
    this.model.on("change", handleModelChange);
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
      <div style="padding: 0 1rem 1rem;">
        <h2>User Form</h2>
        <div>User Name: ${this.model.getAttr("name")}</div>
        <div>User Age: ${this.model.getAttr("age")}</div>
        <br />
        <input />
        <button class="set-name">Set Name</button>
        <br /><br />
        <button class="set-random-age">Set Random Age</button>
      </div>
    `;
  }

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    const fragment: DocumentFragment = templateElement.content;
    this.bindEvents(fragment);
    this.parent.append(fragment);
  }
}

export default UserForm;
