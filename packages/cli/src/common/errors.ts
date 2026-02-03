export class CliError extends Error {
  constructor(
    message: string,
    public props: {
      code: string
    }
  ) {
    super(message)
    this.name = 'CliError'
  }
}
