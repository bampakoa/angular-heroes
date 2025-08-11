import { Thumbnail } from './thumbnail';

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  urls: Url[];
}

interface Url {
  type: string;
  url: string;
}
