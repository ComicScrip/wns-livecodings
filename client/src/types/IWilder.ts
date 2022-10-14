import { ISkill } from "./ISkill";

export interface SkillOfWilder {
  id: number;
  name: string;
  votes: number;
}

export interface IWilderInput {
  name: string;
  city?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  skills?: ISkill[];
}

export interface IWilder extends IWilderInput {
  id: number;
  skills: SkillOfWilder[];
}
