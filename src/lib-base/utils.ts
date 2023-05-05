export function keysOf<T extends { [k: string]: any } | { [k: number]: any }>(o: T): (keyof T)[] {
  return Object.keys(o) as (keyof T)[]
}
