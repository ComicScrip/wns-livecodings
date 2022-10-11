export interface SkillOfWilder {
  id: number;
  name: string;
  votes: number;
}

export interface IWilder {
  id: number;
  name: string;
  city: string | null;
  bio: string | null;
  skills: SkillOfWilder[];
}

export interface IWilderInput {
  name: string;
}
