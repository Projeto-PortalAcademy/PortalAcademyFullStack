import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const endpoints = {
  ATTENDANCE: "/attendance",
  AUTH: "/auth/login",
  FORM: "/forms",
  TEMPLATE: "/templates",
  GROUP: "/groups",
  USER: "/users",

};

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function login(data: { token: string }) {
  return api.post(endpoints.AUTH, data);
}

// Criar Formulário
export function createForm(data: any) {
  return api.post(endpoints.FORM, data);
}

// Atualizar Formulário
export function updateForm(formId: string, data: any) {
  return api.put(`${endpoints.FORM}/${formId}`, data);
}

// Obter um Formulário
export function getForm(formId: string) {
  return api.get(`${endpoints.FORM}/${formId}`);
}

// Listar todos os Formulários
export function listForms(queryParams: any) {
  return api.get(endpoints.FORM, { params: queryParams });
}

// Excluir Formulário
export function deleteForm(formId: string) {
  return api.delete(`${endpoints.FORM}/${formId}`);
}

// Listar Templates
export function listTemplates(queryParams: any) {
  return api.get(endpoints.TEMPLATE, { params: queryParams });
}

// Atualizar Template
export function updateTemplate(templateId: string, data: any) {
  return api.put(`${endpoints.TEMPLATE}/${templateId}`, data);
}

// Excluir Template
export function deleteTemplate(templateId: string) {
  return api.delete(`${endpoints.TEMPLATE}/${templateId}`);
}

// Criar Grupo
export function createGroup(data: any) {
  return api.post(endpoints.GROUP, data);
}

// Atualizar Grupo
export function updateGroup(groupId: string, data: any) {
  return api.put(`${endpoints.GROUP}/${groupId}`, data);
}

// Obter um Grupo
export function getGroup(groupId: string) {
  return api.get(`${endpoints.GROUP}/${groupId}`);
}

// Listar todos os Grupos
export function listGroups(queryParams: any) {
  return api.get(endpoints.GROUP, { params: queryParams });
}

// Excluir Grupo
export function deleteGroup(groupId: string) {
  return api.delete(`${endpoints.GROUP}/${groupId}`);
}

// Listar Grupos do Usuário
export function listUserGroups(queryParams: any) {
  return api.get(`${endpoints.GROUP}/user_groups`, { params: queryParams });
}

// Adicionar Usuário ao Grupo
export function addUserToGroup(data: any) {
  return api.post(`${endpoints.GROUP}/user_groups`, data);
}

// Remover Usuário do Grupo
export function removeUserFromGroup(data: any) {
  return api.delete(`${endpoints.GROUP}/user_groups`, { data });
}

// Criar Usuário
export function createUser(data: any) {
  return api.post(endpoints.USER, data);
}

// Atualizar Usuário
export function updateUser(userId: string, data: any) {
  return api.put(`${endpoints.USER}/${userId}`, data);
}

// Obter um Usuário
export function getUser(userId: string) {
  return api.get(`${endpoints.USER}/${userId}`);
}

// Listar todos os Usuários
export function listUsers(queryParams: any) {
  return api.get(endpoints.USER, { params: queryParams });
}

// Excluir Usuário
export function deleteUser(userId: string) {
  return api.delete(`${endpoints.USER}/${userId}`);
}

export default api;
