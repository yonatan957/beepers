import beeperEnum from '../enums/beeperStatusEnum'
export default class Beeper{
    public id:number
    public status:beeperEnum
    public created_At?:Date
    public detonated_At?:Date
    public latitude?:number
    public longitude?:number
    constructor(
        public name:string
    ){
        this.id = Number(Math.random().
        toString()
        .split(".")[1])  
        this.status = beeperEnum.manufactured  
    }
}