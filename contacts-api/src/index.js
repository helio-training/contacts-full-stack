const { send, json } = require("micro")
const { router, get, post, put, del } = require("microrouter")
const cors = require('micro-cors')()

const db = require("monk")("helio:orange5@ds133642.mlab.com:33642/contacts")

const users = db.get("users")

module.exports = cors(router(
  get("/v1/contacts", async (req, res) => {
    const results = await users.find()
    return send(res, 200, results)
  }),
  post("/v1/contacts", async (req, res) => {
    const user = await json(req)
    const result = await users.insert(user)
    return send(res, 201, result)
  }),
  get("/v1/contacts/:id", async (req, res) => {
    const { id } = req.params
    const result = await users.findOne(id)
    if (result)
      return send(res, 200, result)

    return send(res, 404)
  }),
  put("/v1/contacts/:id", async (req, res) => {
    const { id } = req.params
    const { name, email } = await json(req)
    const result = await users.findOneAndUpdate(id, { name, email })
    return send(res, 200, result)
  }),
  del("/v1/contacts/:id", async (req, res) => {
    const { id } = req.params
    const result = await users.findOneAndDelete(id)
    return send(res, 200, result)
  }),
  get("/*", async (req, res) => send(res, 404, "Not found")),
))
