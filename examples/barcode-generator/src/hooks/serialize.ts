export function b64EncodeJSON(val: unknown): string {
  return btoa(encodeURIComponent(JSON.stringify(val)));
}

export function b64DecodeJSON<T>(val: string): T {
  return JSON.parse(decodeURIComponent(atob(val)));
}
