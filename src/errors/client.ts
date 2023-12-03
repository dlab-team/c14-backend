export default class ClientError extends Error {
  private statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }

  public get StatusCode() {
    return this.statusCode;
  }
}
