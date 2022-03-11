import axios from "axios";
import Express from "express";

import dateInfo from "./domain/dateInfo";
const router = Express.Router();

router.get("/", (req, res) => res.send("Hello world!"));

router.get("/test", async (req, res) => {
  const data = await axios.get("http://75.119.135.161:3101/rewards");

  console.log(data);
  res.json(data);
});

router.get("/date/:dateParam", async (req, res, next) => {
  const { dateParam } = req.params;
  dateInfo
    .fetchInfo(dateParam)
    .then((result) => res.json(result))
    .catch(next);
});

export default router;
