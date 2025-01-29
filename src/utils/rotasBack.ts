export const API_URL = 'http://localhost:3000';

export const getAllItems = async (item: string) => {
  const response = await fetch(`${API_URL}/${item}`);
  return await response.json();
}

export const getItemById = async (item: string, id: number) => {
  const response = await fetch(`${API_URL}/${item}/${id}`);
  return await response.json();
}

export const createItem = async (item: string, object: any) => {
  const response = await fetch(`${API_URL}/${item}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  });
  return await response.json();
}

export const updateItem = async (item: string, id: number, object: any) => {
  const response = await fetch(`${API_URL}/${item}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  });
  return await response.json();
}

export const deleteItem = async (item: string, id: number) => {
  const response = await fetch(`${API_URL}/${item}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
}