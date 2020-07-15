import { Router } from "express";
import { AuthController } from "../controllers/authController";
import auth from "../middleware/auth";

export class AuthRoutes {

    router: Router;
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post("/login", this.authController.login);
        this.router.post("/register", this.authController.register);
        this.router.get("/user", auth, this.authController.loggedInUser);
    }
}