import exp, {Express} from 'express';
import beeperController from './controllers/beeperController'
import cors from 'cors'
import 'dotenv/config' 


const app: Express = exp();
app.use(cors())
app.use(exp.json())
app.use('/api/beepers', beeperController)

app.listen(process.env.PORT, ():void => console.log(`see you at http::localhost:${process.env.PORT}`));
