export interface MarvelResponseData<T> {
  total: number;
  results: T[];
}

export interface MarvelResponse<T> {
  attributionText: string;
  data: MarvelResponseData<T>;
}
