import { APIRequestContext, APIResponse } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class FileApiFacade {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Uploads a file using multipart/form-data
   * @param filePath - The path to the file to upload
   * @param additionalData - Optional extra form fields
   */
  async uploadFile(filePath: string, additionalData: Record<string, string> = {}): Promise<APIResponse> {
    const fileName = path.basename(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    return await this.request.post('/upload', {
      multipart: {
        file: {
          name: fileName,
          mimeType: 'application/octet-stream',
          buffer: fileBuffer,
        },
        ...additionalData,
      },
    });
  }

  /**
   * Submits a form using application/x-www-form-urlencoded
   * @param formData - The form data to submit
   */
  async submitForm(formData: Record<string, string>): Promise<APIResponse> {
    return await this.request.post('/submit-form', {
      form: formData,
    });
  }
}
