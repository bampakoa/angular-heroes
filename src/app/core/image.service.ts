import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {

  constructor() { }

  getImage(variant, thumbnail): string {
    return `${thumbnail.path}/${variant}.${thumbnail.extension}`;
  }

}
