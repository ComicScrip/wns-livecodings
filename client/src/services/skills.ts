import { ISkill, ISkillInput } from "../types/ISkill";
import API from "./APIClient";

export async function getAllSkills(): Promise<ISkill[]> {
  return API.get("/skills").then((res) => res.data);
}

export async function createSkill(props: ISkillInput) {
  return API.post("/skills", props).then((res) => res.data);
}

export async function updateSkill(id: number, data: Partial<ISkillInput>) {
  return API.patch(`/skills/${id}`, data);
}

export async function deleteSkill(id: number) {
  return API.delete(`/skills/${id}`);
}
