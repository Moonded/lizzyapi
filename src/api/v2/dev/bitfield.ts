import express from "express";
import { field } from "utils";
const router = express.Router();

router.get("/", (req, res) => {
  req.query.field = req.query.field || "0";

  if (typeof req.query.field !== "string")
    return res.status(400).send("Invalid field");

  if (parseInt(req.query.field) > 63)
    return res.status(400).send("Field too large");

  res.send(field.get(parseInt(req.query.field)));
});

router.post("/", (req, res) => {
  req.query.field = req.query.field || "0";

  if (typeof req.query.field !== "string")
    return res.status(400).send("Invalid field");

  if (parseInt(req.query.field) > 63)
    return res.status(400).send("Field too large");

  if (req.body.value === undefined)
    return res.status(400).send("No value provided");

  if (typeof req.body.value !== "boolean")
    return res.status(400).send("Invalid value");

  field.set(parseInt(req.query.field), req.body.value);

  res.send({ success: true });
});

router.get("/test", (req, res) => {
  field.set(0);
  field.set(1);
  field.set(2);
  field.set(3);
  field.set(4);
  field.set(5);

  const permission = field
  console.log(permission);
  res.send(permission);
});
export default router;
