import exp, { Router, Request, Response } from "express";

const router:Router = exp.Router();

//create a new beeper
router.post("", async (req:Request, res: Response):Promise<void> =>{
    try {
        res.json({
          err: false,
          message: "Login Successful",
          data: undefined,
        });
      } catch (arr) {
        res.status(404).json({
          err: true,
          message: "Invalid",
          data: null,
        });
      }
})

// get all beepers
router.get("", async (req:Request, res: Response):Promise<void> =>{
    try {
        res.json({
          err: false,
          message: "Login Successful",
          data: undefined,
        });
      } catch (arr) {
        res.status(404).json({
          err: true,
          message: "Invalid",
          data: null,
        });
      }
})

//get details of a specific beeper by id
router.get("/:id", async (req:Request, res: Response):Promise<void> =>{
    try {
        res.json({
          err: false,
          message: "Login Successful",
          data: undefined,
        });
      } catch (arr) {
        res.status(404).json({
          err: true,
          message: "Invalid",
          data: null,
        });
      }
})

//update the status of a specific beeper by id
router.put("/:id/status", async (req:Request, res: Response):Promise<void> =>{
    try {
        res.json({
          err: false,
          message: "Login Successful",
          data: undefined,
        });
      } catch (arr) {
        res.status(404).json({
          err: true,
          message: "Invalid",
          data: null,
        });
      }
})

//delete a  specific beeper by id
router.delete("", async (req:Request, res: Response):Promise<void> =>{
    try {
        res.json({
          err: false,
          message: "Login Successful",
          data: undefined,
        });
      } catch (arr) {
        res.status(404).json({
          err: true,
          message: "Invalid",
          data: null,
        });
      }
})

// get beepers by status
router.get("", async (req:Request, res: Response):Promise<void> =>{
    try {
        res.json({
          err: false,
          message: "Login Successful",
          data: undefined,
        });
      } catch (arr) {
        res.status(404).json({
          err: true,
          message: "Invalid",
          data: null,
        });
      }
})