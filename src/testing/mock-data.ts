import { Character } from '../app/core/character.model';
import { MarvelResponseData } from '../app/core/marvel-response.model';

export const character = {
  id: 1,
  name: '',
  description: 'Super hero with magic powers',
  thumbnail: {
    path: '',
    extension: ''
  },
  urls: [
    {
      url: 'fakeUrl',
      type: 'png'
    }
  ]
};

export const fakeMarvelResponseData: MarvelResponseData<Character> = {
  results: [character],
  total: 1
};
