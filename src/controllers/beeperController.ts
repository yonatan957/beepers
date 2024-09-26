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
      message: "added Successfuly"
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
    res.json(beepers);
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
    res.json(beeper)
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
      const {LAT, LON, status} = req.body
      const statusEnum = beeperEnum[status as "manufactured"]
      if (!statusEnum) throw new Error("invalid")
      
      const Success = await BeeperService.changeStatus(statusEnum ,Number(req.params.id), Number(LAT), Number(LON));
      if (!Success) throw new Error("invalid")

      res.json({
        message: "change Successfuly",
      });
    } catch (arr) {
      res.status(404).json({
        err: true,
        message: "Invalid",
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
      message: "delete Successful",
    });
  } catch (arr) {
    res.status(404).json({
      err: true,
      message: "Invalid"
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
      res.json(beepers);
    } catch (arr) {
      res.status(404).json({
        err: true,
        message: "Invalid"
      });
    }
  }
);

export default router;
