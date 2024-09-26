import exp, {Express} from 'express';
import beeperController from './controllers/beeperController'

import 'dotenv/config' 


const app: Express = exp();
app.use(exp.json())
app.use('/api/beepers', beeperController)

app.listen(process.env.PORT, ():void => console.log(`see you at http::localhost:${process.env.PORT}`));
// enum beeperStatus{
//     manufactured,
//     assembled,
//     shipped ,
//     deployed ,
//     detonated
// }
// let ddd = beeperStatus["assembled"]
// ddd ++;
// ddd ++;
// console.log(ddd);
