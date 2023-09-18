export function isEmailValid (email: string): boolean {
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const match = email.match(EMAIL_REGEX)
  return match != null && match.length > 0
}
