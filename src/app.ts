import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { serverConfig } from './configs/server-config';
import AppRoutes from "./routes/appRoutes";

class App {

    private readonly _configs = serverConfig.getConfigs();
    public app: express.Application = express();

    constructor() {
        this.config();
        this.setHeaders();
        this.mongoSetup();
        this.setRoutes();
    }

    private setHeaders() {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, OPTIONS, PUT, PATCH, DELETE'
            );
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
            );
            next();
        });
    }

    private config(): void {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true,
            parameterLimit: 50000
        }));
        this.app.disable('etag');
    }

    private setRoutes() {
        AppRoutes.addRoutes(this.app);
    }

    private mongoSetup(): void {
        mongoose.connect(this._configs.MongodbConnection, { useNewUrlParser: true });
        (mongoose as any).Promise = global.Promise;
    }

}

export default new App().app;