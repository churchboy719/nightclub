import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      isActive: boolean;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
  }

  interface JWT {
    role: string;
    isActive: boolean;
  }
}
