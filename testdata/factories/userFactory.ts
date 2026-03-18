export interface User {
  name: string;
  job: string;
}

export class UserFactory {
  static createRandomUser(): User {
    const timestamp = Date.now();
    return {
      name: `User_${timestamp}`,
      job: 'Tester',
    };
  }

  static createSpecificUser(name: string, job: string): User {
    return {
      name,
      job,
    };
  }
}
