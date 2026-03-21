export function preventWidow(text: string): string {
  return text.replace(/\s+([^\s]+)\s*$/, '\u00A0$1');
}
