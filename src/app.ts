import express from 'express';
import {envs} from './config/envs.plugin'
import { AppRoutes } from './presentation/routes';
import { MongoDatabase } from './data/init';
import { IncidentModel } from './data/models/incident.model';
import 'dotenv/config'
import { emailJob } from './domain/jobs/email.job';

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

// console.log(envs.MONGO_URL);
// console.log(envs.PORT);
(async ()=>{
  await MongoDatabase.connect(
    {
      dbName:"IncidentAPI2",
      mongoUrl:envs.MONGO_URL ?? ""
    });
  
})();

app.listen(envs.PORT, () => {
  console.log("Servidor está corriendo");
  emailJob();
});