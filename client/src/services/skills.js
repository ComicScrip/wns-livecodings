import API from './APIClient';

export async function getAllSkills() {
  return API.get('/skills').then((res) => res.data);
}
