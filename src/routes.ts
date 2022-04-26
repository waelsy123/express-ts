import Express from "express";
import { callNode, sleep, sum } from "./lib/helpers";

const router = Express.Router();

router.get("/", (req, res) => res.send("Hello world!"));


router.get("/test", async (req, res) => {
  const dataArray: any = []

  for (let i = 0; i < 2; i++) {
    await sleep(50)

    const data = await callNode(i)

    if (!data) {
      break
    }

    dataArray.push(data)
  }

  res.json({
    count: dataArray.length,
    totalRewardsBcoin: sum(dataArray.map((i: any) => i.BCoin)),
    totalRewardsSens: sum(dataArray.map((i: any) => i.Senspark)),
    totalKeys: sum(dataArray.map((i: any) => i.Key)),
    totalBomberman: sum(dataArray.map((i: any) => i.Bomberman)),
    list: dataArray
  });

});


export default router;
