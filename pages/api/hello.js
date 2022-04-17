// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var fs = require("fs");

export default async function handler(req, res) {
  let a = await fs.readFileSync("./lap3.json");
  res.json(JSON.parse(a));
}
