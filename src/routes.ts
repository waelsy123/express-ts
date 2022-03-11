import axios from "axios";
import Express from "express";

const router = Express.Router();

router.get("/", (req, res) => res.send("Hello world!"));

var sum = (a: number[]) => a.reduce(function (a, b) { return a + b; }, 0);

router.get("/test", async (req, res) => {
  const dataArray: any = []

  for (let i = 0; true; i++) {
    try {
      const response = await axios.get(`http://75.119.135.161:${3100 + i}/rewards`);
      const { data } = response
      dataArray.push(data)

    } catch {
      break;
    }

  }

  res.json({
    count: dataArray.length,
    totalRewards: sum(dataArray.map((i: any) => i.BCoin)),
    totalKeys: sum(dataArray.map((i: any) => i.Key)),
    totalBomberman: sum(dataArray.map((i: any) => i.Bomberman)),
    list: dataArray
  });

});


export default router;
