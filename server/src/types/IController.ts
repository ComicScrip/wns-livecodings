import { Request,Response } from "express"


export interface IController{
    [key: string]:(req:Request, res:Response) => void
}