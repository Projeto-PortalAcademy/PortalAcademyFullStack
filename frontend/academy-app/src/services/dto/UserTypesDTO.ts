
export type Role = "student" | "evaluator" | "admin";

export interface CreateUserSchema {
  name: string;
  email?: string;
  roles: Role;
  photo?: string;
}

export interface UpdateUserSchema {
  name?: string;
  email?: string;
  photo?: string;
  roles?: Role;
}

export interface GetUserSchema {
  id: number;
  name: string;
  email?: string;
  photo?: string;
  roles: Role;
}

export interface GetAllUsersSchema {
  data: GetUserSchema[];
}

export interface DeleteUserSchema {
  id: number;
}
