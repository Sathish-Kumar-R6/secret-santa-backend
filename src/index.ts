import configs from "../config/config";
import app from "./server";
import { logger } from "./lib/winston/winston";

const SERVER_START_MSG = `Express server started at http://${configs.host.toString()}:${configs.port.toString()}`;

app.listen(configs.port, () => {
  logger.info(SERVER_START_MSG);
});
