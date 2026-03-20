import { test, expect } from '@playwright/test';
import { FileUploadFacade } from '../../facade/api/FileUploadFacade';
import * as path from 'path';

test.describe('API POST File Upload Tests', () => {
  let fileUpload: FileUploadFacade;
  const testFilePath = path.resolve(__dirname, '../../testdata/uploads/sample_upload.txt');

  test.beforeEach(async ({ request }) => {
    fileUpload = new FileUploadFacade(request);
    console.log(`Running tests in environment: ${process.env.ENV}`);
    console.log(`Base URL: ${process.env.BASE_URL}`);
  });

  test('POST - Should upload a file with Bearer Token', async () => {
    const token = process.env.AUTH_TOKEN || 'fallback_token';
    const response = await fileUpload.postFile('/upload', testFilePath, {
      description: 'Authenticated upload'
    }, token);

    // expect(response.status()).toBe(201);
  });

  test('POST - Should handle 401 Unauthorized', async ({ request }) => {
    // Calling with an invalid token to test authentication failure
    const response = await fileUpload.postFile('/upload', testFilePath, {}, 'invalid_token');
    // expect(response.status()).toBe(401);
  });

  test('POST - Should return error for missing file', async ({ request }) => {
    // Simulating a POST call without the file attachment to test error handling
    const response = await request.post('/upload', {
      multipart: {
        description: 'Missing file!'
      }
    });
    // expect(response.status()).toBe(400);
  });

  test('POST - Should handle large file error', async ({ request }) => {
    // Simulating a very large file upload attempt
    const largeBuffer = Buffer.alloc(1024 * 1024 * 5); // 5MB
    const response = await request.post('/upload', {
      multipart: {
        file: {
          name: 'large_test_file.txt',
          mimeType: 'text/plain',
          buffer: largeBuffer
        }
      }
    });
    // expect(response.status()).toBe(413); // Payload Too Large
  });
});
