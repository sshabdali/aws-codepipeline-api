import { Router } from "express";
import { ProductController } from "../controllers/productController";
import auth from "../middleware/auth";

export class ProductRoutes {

    router: Router;
    public productController: ProductController = new ProductController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get("/list", auth, this.productController.GetProductList);
        this.router.get("/:productId", auth, this.productController.GetProductDetails)
        this.router.post("/add", auth, this.productController.AddNewProduct);
        this.router.put("/:productId", auth, this.productController.UpdateProduct);
        this.router.delete("/:productId", auth, this.productController.DeleteProduct);
    }
}