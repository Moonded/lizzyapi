import express from "express";
import { readFile } from "utils";
import swaggerUi from "swagger-ui-express";
const router = express.Router();

router.get("/v1", (req, res) => {
  res.send(JSON.parse(readFile("docs/v1.json")));
});
router.use(
  "/v2",
  swaggerUi.serve,
  swaggerUi.setup(JSON.parse(readFile("docs/v2.json")))
);

export default router;
