import exp, {Express} from 'express';

import 'dotenv/config' 


const app: Express = exp();
app.use(exp.json())

app.listen(process.env.PORT, ():void => console.log(`see you at http::localhost:${process.env.PORT}`));
