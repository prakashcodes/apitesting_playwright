import { APIRequestContext, APIResponse } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class FileUploadFacade {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Performs a POST request to upload a file using multipart/form-data.
   * @param endpoint - The API endpoint to call.
   * @param filePath - The absolute path to the file to upload.
   * @param additionalFields - Optional extra form fields to include in the request.
   * @param token - Optional Bearer token for authentication.
   */
  async postFile(
    endpoint: string, 
    filePath: string, 
    additionalFields: Record<string, string | number | boolean> = {},
    token?: string
  ): Promise<APIResponse> {
    const fileName = path.basename(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    return await this.request.post(endpoint, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      multipart: {
        file: {
          name: fileName,
          mimeType: 'application/octet-stream',
          buffer: fileBuffer,
        },
        ...additionalFields,
      },
    });
  }
}
