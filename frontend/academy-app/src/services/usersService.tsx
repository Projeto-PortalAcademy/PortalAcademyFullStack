const API_BASE_URL = 'http://localhost:8080';



// Criar Usuário
export async function createUser(data: any): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create user: ${JSON.stringify(errorData)}`);
  }
}

// Atualizar Usuário
export async function updateUser(userId: string, data: any): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to update user: ${JSON.stringify(errorData)}`);
  }
}

// Obter um Usuário
export async function getUser(userId: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  return await response.json();
}

// Listar todos os Usuários
export async function listUsers(queryParams: Record<string, any>): Promise<any[]> {
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await fetch(`${API_BASE_URL}/users?${queryString}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  return await response.json();
}

// Excluir Usuário
export async function deleteUser(userId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user: ${response.status}`);
  }
}
