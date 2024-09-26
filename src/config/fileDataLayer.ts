import fs from 'fs/promises'

export const getFileData = async<T> (resource:string):Promise<T[]| void> =>{
    try {
        const data:string = await fs.readFile(`${__dirname}/../../data/${resource}.json`, 'utf-8')
        const parsedData:T[] = JSON.parse(data)
        return parsedData
    } catch (error) {
        console.log(error)
    }
}

export const saveFileData = async<T> (resource:string,data:T[]):Promise<boolean> =>{
    try {
        const stringyData:string = JSON.stringify(data, null, 2)
        await fs.writeFile(`${__dirname}/../../data/${resource}.json`, stringyData, {encoding:'utf-8'} )
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}