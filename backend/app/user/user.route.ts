import { Router } from "express";
import passport from "passport";
import { catchError } from "../common/middleware/cath-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";

const router = Router();

router
  .post(
    "/register",
    userValidator.createUser,
    catchError,
    userController.createUser
  )
  .post(
    "/login",
    userValidator.login,
    catchError,
    passport.authenticate("login", { session: false }),
    userController.login
  )
  .get("/me", roleAuth(["USER", "ADMIN"]), userController.getUserInfo)
  .post("/logout", roleAuth(["USER"]), userController.logout)
  .get("/:id", roleAuth(["USER", "ADMIN"]), userController.getUserById)
  .get("/", userController.getAllUsers)
  .patch(
    "/:id",
    roleAuth(["ADMIN", "USER"]),
    userValidator.editUser,
    catchError,
    userController.editUser
  )
  .delete("/:id", roleAuth(["ADMIN"]), userController.deleteUser)
  .post("/donate", roleAuth(["USER"]), userController.donate)
  .post(
    "/subscribe",
    roleAuth(["USER"]),
    userController.subscribeToFundingPlan
  );

export default router;
