import API from './APIClient';

export async function getAllWilders() {
  const { data } = await API.get('/wilders');
  return data;
}

export async function createWilder(wilderProps) {
  return API.post('/wilders', wilderProps);
}

export async function deleteWilder(id) {
  return API.delete(`/wilders/${id}`);
}

export async function addSkillToWilder(wilderId, skillId) {
  return API.post(`/wilders/${wilderId}/skills`, { skillId });
}

export async function removeSkillFromWilder(wilderId, skillId) {
  return API.delete(`/wilders/${wilderId}/skills/${skillId}`);
}
