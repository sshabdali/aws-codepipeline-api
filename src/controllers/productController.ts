import { Response } from 'express';
import * as HttpStatusCodes from "http-status-codes";
import Request from "../types/Request";
import Product from "../models/product";

export class ProductController {

    // get single product by productId
    public async GetProductDetails(req: Request, res: Response) {
        try {
            const productId = req.params.productId

            let product = await Product.findById(productId, { __v: false });

            res.json(product || {});

        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    // get all products by user
    public async GetProductList(req: Request, res: Response) {
        try {
            const excludeFields = {
                __v: false,
            }

            let products = await Product.find({ userId: req.userId }, excludeFields).sort({ _id: "desc" });

            products = JSON.parse(JSON.stringify(products))

            res.json(products);

        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    public async AddNewProduct(req: Request, res: Response) {
        try {
            const productNo = Math.random().toString(36).substr(2, 11)

            var newProduct = JSON.parse(JSON.stringify(req.body));
            newProduct["productNo"] = productNo;
            newProduct["userId"] = req.userId

            var newProductEntity = new Product(newProduct);
            await newProductEntity.save();

            res.status(201).send({ productNo, productId: newProductEntity._id });

        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    public async UpdateProduct(req: Request, res: Response) {
        try {
            const productId = req.params.productId;

            let existingProduct = await Product.findById(productId);
            existingProduct = JSON.parse(JSON.stringify(existingProduct));

            existingProduct = { ...existingProduct, ...req.body }

            await Product.findByIdAndUpdate(
                productId,
                existingProduct,
                { overwrite: true },
            );

            res.status(200).send();

        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    public async DeleteProduct(req: Request, res: Response) {
        try {
            const response = await Product.findByIdAndRemove(req.params.productId);
            if (response) {
                res.status(200).send();
            }
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
}
