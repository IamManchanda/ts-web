import { EventsMapProps } from "../ts-utils/interfaces";

class UserForm {
  constructor(public parent: Element) {}

  eventsMap(): EventsMapProps {
    return {
      "click:button": this.onButtonClick,
    };
  }

  onButtonClick(): void {
    console.log("On Button Click");
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
    this.parent.append(templateElement.content);
  }
}

export default UserForm;
