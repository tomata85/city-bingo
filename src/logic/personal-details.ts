export function isEmailValid (email: string): boolean {
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const match = email.match(EMAIL_REGEX)
  return match != null && match.length > 0
}

export function presentableName (name: string): string {
  if (name.length > 15) {
    const initials = name.split(' ').map((namePart) => namePart[0]).join('').toLocaleUpperCase()
    return initials
  }
  return name
}
