import API from './APIClient';

export async function getAllWilders() {
  const { data } = await API.get('/wilders');
  return data;
}

export async function createWilder(wilderProps) {
  return API.post('/wilders', wilderProps);
}
