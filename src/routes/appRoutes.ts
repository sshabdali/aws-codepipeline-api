import { Application } from 'express';
import { AuthRoutes } from './authRoutes';
import { ProductRoutes } from './productRoutes';
import { ContactRoutes } from './contactRoutes';

export default class AppRoutes {
    static addRoutes(app: Application) {

        // old way
        ContactRoutes.addRoutes(app);
        app.use("/api/auth", new AuthRoutes().router);
        app.use("/api/product", new ProductRoutes().router);


        app.route('/api/islive')
            .get((req, res) => res.status(200).send({ isLive: true }));

        app.get('*', (req, res, next) => {
            res.status(404).json({ message: `opps! api route '${req.url}' not found` });
        });
    }
}
