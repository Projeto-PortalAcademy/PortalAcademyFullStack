
export interface CreateGroupSchema {
    name: string;
    image?: string;
}
  
  export interface UpdateGroupSchema {
    name?: string;
    image?: string;
}
  
  export interface GroupResponse {
    id: string;
    name: string;
    image?: string;
}
  
export interface CreateUserGroupSchema {
    user_id: string;
    group_id: string;
}
  
export interface RemoveUserFromGroupSchema {
    user_id: string;
    group_id: string;
}
  
export interface UserGroupResponse {
    user_id: string;
    group_id: string;
}
  