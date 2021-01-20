export type Comment = {
    id:string,
    body:string,
    author:{
        name:string,
        id:string
    },
    creationDate:string
}