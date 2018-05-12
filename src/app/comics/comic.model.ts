import { Thumbnail } from '../core/thumbnail.model';

export interface Comic {
  id: number;
  digitalId: number;
  thumbnail: Thumbnail;
}
