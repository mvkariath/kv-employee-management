import express, { Request, Response } from "express";
// import employeeRouter from "./employee_router";
// import loggerMiddleware from "./loggerMiddleware";
// import { processTimeMiddleware } from "./processTimeMiddleware";
import  datasource from "./db/data-source";
import employeeRouter from './routers/employee.router'
import loggerMiddleware from "./middleware/loggerMiddleware";
import processTimeMiddleware from "./middleware/processTimeMiddleware";
import errorMiddleware from "./middleware/errorMiddleware";
import authRouter from "./routers/auth.router";
import { authMiddleware } from "./middleware/auth.middleware";
import { LoggerService } from "./services/logger.services";

const server = express();
const logger = LoggerService.getInstance('app()')

server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);

server.use('/login',authRouter)
server.use("/employee", authMiddleware,employeeRouter);

server.use(errorMiddleware);

server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});
(async ()=>{
  try{
    await datasource.initialize();
    logger.info('Database connected')
  }
  catch{
    logger.error("Failed");
    process.exit();
  }
  server.listen(3000, () => {
    logger.info("server listening to 3000");
  });
})();




