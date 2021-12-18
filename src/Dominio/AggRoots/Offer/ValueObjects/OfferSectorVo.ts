export class SectorVO {
  value: Sectors;
  constructor(value: Sectors) {
    this.value = value;
  }
}

export enum Sectors {
  Technology,
  Laws,
}
