import { User } from "../models";
import { EventsMapProps } from "../ts-utils/interfaces";

export abstract class View {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  abstract get eventsMap(): EventsMapProps;
  abstract template(): string;

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
        const iterateFragmentSelectors = (element: any) => {
          element.addEventListener(eventName, eventValue);
        };
        fragment.querySelectorAll(selector).forEach(iterateFragmentSelectors);
      }
    }
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
