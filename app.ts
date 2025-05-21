import express from "express";
import employeeRouter from "./routes/employee.route";
import datasource from "./db/data-source";
import loggerMiddleware from "./loggerMiddleware";

import { Client } from "pg";


const server = express();
server.use(express.json());
server.use(loggerMiddleware);

server.use("/employee", employeeRouter);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});

// Database connection configuration - without orm
// const dbConfig = {
//   user: 'postgres',
//   password: 'postgres',
//   host: 'localhost',
//   port: 5433,
//   database: 'training',
// };

(async()=>{
  try{
    await datasource.initialize()
    console.log("Connected to the DB!!")
  }
  catch{
    console.error('Failed to connect to the DB');
    process.exit(1);
  }
  server.listen(3000, () => {
  console.log("server listening to 3000");
});


})()







