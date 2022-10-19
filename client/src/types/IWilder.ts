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
  skills?: { id: number }[];
}

export interface IWilder extends IWilderInput {
  id: number;
  skills: SkillOfWilder[];
}
