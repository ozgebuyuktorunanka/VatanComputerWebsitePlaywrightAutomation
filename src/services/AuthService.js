export class AuthService {
  constructor() {
    this.credentials = {
      email: process.env.EMAIL,
      password: process.env.PASSWORD
    };
  }
  validateCredentials() {
    const email = this.credentials.email;
    const password = this.credentials.password;
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    // Check for empty or whitespace-only values
    if (!email.trim() || !password.trim()) {
      throw new Error('Email and password cannot be empty');
    }
  }

  getTestCredentials() {
    return this.credentials;
  }
}  
