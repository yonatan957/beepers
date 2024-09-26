class beeper{
    public id:number
    public created_At?:Date
    public detonated_At?:Date
    public latitude?:number
    public longitude?:number
    constructor(
        public name:string
    ){
        this.id = Math.floor(Math.random() * 1000)
    }
}