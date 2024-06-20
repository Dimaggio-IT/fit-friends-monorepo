export abstract class Entity {
  private _id: undefined | string = undefined;

  public get id(): string | undefined {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }
}
