const express = require("express");
const router = express.Router();
const authRoute=require("./auth.route.js")
const adminRoute=require("./admin.route.js")

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path:"/admin",
    route:adminRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
