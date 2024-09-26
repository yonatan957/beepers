import { getFileData, saveFileData } from '../config/fileDataLayer';
import Beeper from '../models/BeeperModel'
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
}