export interface FileUpload {

    name: string,
    data: any;
    //estos datos los puedes ver si haces esto en postan metiendo una imagen,localhost:3000/dishes/upload
    encoding: string,
    tempFilePath: string,
    truncated: boolean,
    mimetype: string,

    //var mover
    mv: Function;

}