/**
 * API Error model representing errors from API responses
 * @summary Class for standardizing error handling across the application
 * @author [Tu nombre y apellido]
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public messages: string,
    public errors?: any
  ) {
    super(messages);
    this.name = 'ApiError';
  }
}
