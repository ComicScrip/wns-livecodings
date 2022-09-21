import { ISkill } from '../types/ISkill';
import API from './APIClient';

export async function getAllSkills(): Promise<ISkill[]> {
  return API.get('/skills').then((res) => res.data);
}
