import {
  EventsMapProps,
  RegionsProps,
  RegionsMapProps,
} from "../ts-utils/interfaces";
import Model from "../models/Model";
import UserForm from "./UserForm";
import UserShow from "./UserEdit";

abstract class View<T extends Model<K>, K> {
  regions: RegionsProps = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  get regionsMap(): RegionsMapProps {
    return {};
  }

  get eventsMap(): EventsMapProps {
    return {};
  }

  onRender(): void {}

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

  mapRegions(fragment: DocumentFragment): void {
    const { regionsMap } = this;
    for (const regionsKey in regionsMap) {
      if (regionsMap.hasOwnProperty(regionsKey)) {
        const regionsValue = regionsMap[regionsKey];
        const element = fragment.querySelector(regionsValue);
        if (element) {
          this.regions[regionsKey] = element;
        }
      }
    }
  }

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    const fragment: DocumentFragment = templateElement.content;
    this.bindEvents(fragment);
    this.mapRegions(fragment);
    this.onRender();
    this.parent.append(fragment);
  }
}

export default View;
