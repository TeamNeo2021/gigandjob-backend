import { EmptyCvPhotoError } from '../Errors/emptyCvPhoto.error';

export class CvPhoto {
  private _photo: Buffer;

  get photo() {
    return this._photo;
  }

  constructor(rawPhoto: Buffer) {
    if (rawPhoto.length <= 0) throw new EmptyCvPhotoError();

    this._photo = rawPhoto;
  }
}
