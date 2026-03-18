import { APIRequestContext, APIResponse } from '@playwright/test';

export class UserApiFacade {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getUsers(page: number = 1): Promise<APIResponse> {
    return await this.request.get(`/users?page=${page}`);
  }

  async createUser(userData: { name: string; job: string }): Promise<APIResponse> {
    return await this.request.post('/users', {
      data: userData,
    });
  }

  async updateUser(userId: number, userData: { name: string; job: string }): Promise<APIResponse> {
    return await this.request.put(`/users/${userId}`, {
      data: userData,
    });
  }

  async deleteUser(userId: number): Promise<APIResponse> {
    return await this.request.delete(`/users/${userId}`);
  }
}
