export interface Marvel<T> {
  data: {
    total: number;
    results: T[];
  }
}
