const express = require("express");

const { validateBody } = require("../../utils");

const { authenticate, uploadCloudAvatars } = require("../../middlewares");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth-controllers");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/user-upd",
  authenticate,
  uploadCloudAvatars.single("avatar"),
  ctrl.updateSubscription
);

router.get("/user-info/:id", ctrl.getUserInfo);

router.get("/get-user-history/:id", ctrl.getUserHistory);

router.patch(
  "/upd-user-history",
  validateBody(schemas.updUserHistory),
  ctrl.updUserHistory
);

module.exports = router;
