class Attributing<T> {
  constructor(private data: T) {}

  getAttr = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  setAttr(update: T): void {
    Object.assign(this.data, update);
  }

  getAllAttrs(): T {
    return this.data;
  }
}

export default Attributing;
