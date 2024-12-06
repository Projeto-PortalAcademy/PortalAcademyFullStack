import api, { endpoints } from "./api";
import {
  CreateUserSchema,
  UpdateUserSchema,
  GetUserSchema,
  GetAllUsersSchema,
} from "./dto/UserTypesDTO";

const userService = {
  createUser: async (userData: CreateUserSchema): Promise<{ message: string }> => {
    const response = await api.post(endpoints.USER, userData);
    return response.data;
  },

  deleteUser: async (userId: number): Promise<{ message: string }> => {
    const response = await api.delete(`${endpoints.USER}/${userId}`);
    return response.data;
  },

  getUser: async (userId: number): Promise<GetUserSchema> => {
    const response = await api.get(`${endpoints.USER}/${userId}`);
    return response.data;
  },

  getAllUsers: async (limit = 100, offset = 0): Promise<GetAllUsersSchema> => {
    const response = await api.get(endpoints.USER, {
      params: { limit, offset },
    });
    return response.data || [];
    },

  updateUser: async (
    userId: number,
    userData: UpdateUserSchema
  ): Promise<{ message: string }> => {
    const response = await api.put(`${endpoints.USER}/${userId}`, userData);
    return response.data;
  },
};

export default userService;
