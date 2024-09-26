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
        const stautses = ["manufactured", "assembled", "shipped", "deployed", "detonated"]
        let beepers:Beeper[] = await getFileData<Beeper>('beepers') as Beeper[]
        let beeper = beepers.find(b => b.id === id)

        if(!beeper) return false
        //check if the status he wants is more advanced than the current 
        if(stautses.indexOf(status) <= stautses.indexOf(beeper.status)){return false}

        if (status === beeperEnum.deployed){
            if (!lat || !long) return false
            beeper.latitude = lat
            beeper.longitude = long
            beeper.status = status
            await saveFileData('beepers', beepers)
            setTimeout(async() => {
                beeper.status = beeperEnum.detonated  
                beeper.detonated_At = new Date
                await saveFileData('beepers', beepers)
            }, 10000);
            return true         
        }
        beeper.status = status
        if (beeper.status === beeperEnum.detonated){
            beeper.detonated_At = new Date
        }
        beeper.status = status
        return await saveFileData('beepers', beepers)
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