import exp, { Router, Request, Response } from "express";
import BeeperService from "../services/beeperService";
import Beeper from "../models/BeeperModel";
import beeperEnum from "../enums/beeperStatusEnum";

const router: Router = exp.Router();

//create a new beeper
router.post("", async (req: Request, res: Response): Promise<void> => {
  try {
    let { name } = req.body;
    BeeperService.addBeeper(name);
    res.json({
      err: false,
      message: "added Successfuly",
    });
  } catch (arr) {
    res.status(404).json({
      err: true,
      message: "Invalid",
      data: null,
    });
  }
});

// get all beepers
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const beepers: Beeper[] = await BeeperService.getAllBeepers();
    res.json({
      beepers,
    });
  } catch (arr) {
    res.status(404).json({
      err: true,
      message: "Invalid",
      data: null,
    });
  }
});

//get details of a specific beeper by id
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const beeper = await BeeperService.findBeeperById(Number(req.params.id));
    res.json({
      beeper,
    });
  } catch (arr) {
    res.status(404).json({
      err: true,
      message: "Invalid",
      data: null,
    });
  }
});

//update the status of a specific beeper by id
router.put("/:id/status",async (req: Request, res: Response): Promise<void> => {
    try {
      const {LAT, LON, Status} = req.body
      const statusEnum = beeperEnum[Status as "manufactured"]
      const Success = await BeeperService.changeStatus(statusEnum ,Number(req.params.id), Number(LAT), Number(LON));
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
  }
);

//delete a  specific beeper by id
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const Success = await BeeperService.deleteById(Number(req.params.id));
    if (!Success) {
      throw new Error("not deleted");
    }
    res.json({
      err: false,
      message: "delete Successful",
    });
  } catch (arr) {
    res.status(404).json({
      err: true,
      message: "Invalid",
      data: null,
    });
  }
});

// get beepers by status
router.get(
  "/status/:status",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const status = beeperEnum[req.params.status as "manufactured"]
      console.log(status)
      const beepers:Beeper[] = await BeeperService.findByStatus(status)
      res.json({
        beepers
      });
    } catch (arr) {
      res.status(404).json({
        err: true,
        message: "Invalid",
        data: null,
      });
    }
  }
);

export default router;
