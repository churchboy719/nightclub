declare namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      JWT_SECRET: string;
      // Add other variables here
    }
  }
  