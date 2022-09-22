export interface SkillOfWilder{
    id:number,
    name:string,
    votes:number,
}



export interface IWilder{
    filter(arg0: (wilder: any) => boolean): IWilder;
    id:number,
    name:string,
    city:string | null,
    bio: string | null,
    skills: SkillOfWilder[]
}