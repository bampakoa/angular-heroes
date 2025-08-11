import { Thumbnail } from '../models/thumbnail';

export interface Comic {
  id: number;
  digitalId: number;
  thumbnail: Thumbnail;
}
