export class AuthService {
    constructor() {
      this.credentials = {
        email: process.env.EMAIL,
        password: process.env.PASSWORD
      };
    }
  
    getTestCredentials() {
      return this.credentials;
    }
}  