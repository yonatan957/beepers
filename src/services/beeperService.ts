import { getFileData, saveFileData } from '../config/fileDataLayer';
import Beeper from '../models/BeeperModel'
import beeperEnum from '../enums/beeperStatusEnum'

export default class BeeperService{
    public static async addBeeper(name:string):Promise<boolean>{
        const newBeeper:Beeper = new Beeper(name)
        let beepers:Beeper[] = await getFileData<Beeper>('beepers') as Beeper[]

        if (!beepers) beepers =[]

        beepers.push(newBeeper)

        return await saveFileData('beepers', beepers)
    }

    public static async getAllBeepers():Promise<Beeper[]>{
        const beepers = await getFileData<Beeper>('beepers') as Beeper[]
        return beepers
    }

    public static async findBeeperById(id:number):Promise<Beeper|undefined>{
        let beepers:Beeper[] = await getFileData<Beeper>('beepers') as Beeper[]
        return beepers.find(b => b.id === id)
    }

    public static async changeStatus(status:beeperEnum, id:number, lat?:number, long?:number):Promise<boolean>{
        let beepers:Beeper[] = await getFileData<Beeper>('beepers') as Beeper[]
        let beeperindex = beepers.findIndex(b => b.id === id)
        let beeper = beepers[beeperindex]
        if(!beeper) return false
        
        if (status === beeperEnum.deployed){
            if (!lat || !long) return false
            beeper.latitude = lat
            beeper.longitude = long
            await new Promise<void>((res, req) => {
                setTimeout(() => {
                    beeper.status = beeperEnum.detonated
                    beeper.detonated_At = new Date
                    saveFileData('beepers', beepers)
                    res()
                }, 10000);
            });
        }
        beeper.status = status

        return await saveFileData('beepers', beepers)
    }

    public static async explodeBeeper(index:number, beepers:Beeper[]):Promise<void>{
        setTimeout(() => {
            beepers[index].status = beeperEnum.detonated
            beepers[index].detonated_At = new Date
            saveFileData('beepers', beepers)
        }, 10000);
    }

    public static async deleteById(id:number):Promise<boolean>{
        let beepers:Beeper[] = await getFileData<Beeper>('beepers') as Beeper[]
        let index = beepers.findIndex(b => b.id === id)
        if(index === -1) return false
        beepers.splice(index, 1)
        return await saveFileData('beepers', beepers)
    }

    public static async findByStatus(beeperEnum: beeperEnum):Promise<Beeper[]>{
        let beepers:Beeper[] = await getFileData<Beeper>('beepers') as Beeper[]
        return beepers.filter(b => b.status === beeperEnum)
    }
}