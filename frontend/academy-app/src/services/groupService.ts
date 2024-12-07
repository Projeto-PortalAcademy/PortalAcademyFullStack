import api, { endpoints } from "./api";
import {
  CreateGroupSchema,
  UpdateGroupSchema,
  GroupResponse,
  CreateUserGroupSchema,
  RemoveUserFromGroupSchema,
  UserGroupResponse,
} from "./dto/GroupTypes";

export const groupService = {
  createGroup: async (groupData: CreateGroupSchema): Promise<{ message: string }> => {
    const response = await api.post(endpoints.GROUP, groupData);
    return response.data;
  },

  deleteGroup: async (groupId: string): Promise<{ message: string }> => {
    const response = await api.delete(`${endpoints.GROUP}/${groupId}`);
    return response.data;
  },

  getGroup: async (groupId: string): Promise<GroupResponse> => {
    const response = await api.get(`${endpoints.GROUP}/${groupId}`);
    return response.data;
  },

  getAllGroups: async (limit = 100, offset = 0): Promise<GroupResponse[]> => {
    const response = await api.get(endpoints.GROUP, {
      params: { limit, offset },
    });
    return response.data;
  },

  updateGroup: async (
    groupId: string,
    groupData: UpdateGroupSchema
  ): Promise<{ message: string }> => {
    const response = await api.put(`${endpoints.GROUP}/${groupId}`, groupData);
    return response.data;
  },

  addUserToGroup: async (
    userGroupData: CreateUserGroupSchema
  ): Promise<{ message: string }> => {
    const response = await api.post(endpoints.USER_GROUP, userGroupData);
    return response.data;
  },

  removeUserFromGroup: async (
    userGroupData: RemoveUserFromGroupSchema
  ): Promise<{ message: string }> => {
    const response = await api.delete(endpoints.USER_GROUP, { data: userGroupData });
    return response.data;
  },

  getAllUserGroups: async (
    limit = 100,
    offset = 0
  ): Promise<UserGroupResponse[]> => {
    const response = await api.get(endpoints.USER_GROUP, {
      params: { limit, offset },
    });
    return response.data;
  },
};
