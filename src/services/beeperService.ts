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

    public static async findById(id:number):Promise<Beeper|undefined>{
        let beepers:Beeper[] = await getFileData<Beeper>('beepers') as Beeper[]
        return beepers.find(b => b.id === id)
    }

    public static async changeStatus(id:number, status:beeperEnum):Promise<boolean>{
        let beepers:Beeper[] = await getFileData<Beeper>('beepers') as Beeper[]
        let beeper = beepers.find(b => b.id === id)
        if(!beeper) return false
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
}