export interface IData {
    create()
    readSingle(id: string)
    readList()
    update()
    delete()
}