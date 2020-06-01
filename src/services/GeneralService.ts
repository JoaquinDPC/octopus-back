import { Request, Response } from "express";

export class GeneralService {
  public basicRequest(req: Request, res: Response) {
    return res.json("Server working!");
  };
};