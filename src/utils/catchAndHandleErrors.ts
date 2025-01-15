import { Response } from "express";

export const catchAndHandleErrors = async (
  res: Response, 
  fn: () => Promise<void>
) => {
  try {
    await fn()
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Internal server error'})
  }
} 