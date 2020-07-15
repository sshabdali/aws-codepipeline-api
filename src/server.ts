import app from "./app";
import { serverConfig } from './configs/server-config';

const conf = serverConfig.getConfigs();

const HOST = conf.ServiceHost;
const PORT = conf.ServicePort;

const baseUrl = `http://${HOST}:${PORT}`;

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
    console.log(`AWS basic API server running at '${baseUrl}'`);
})