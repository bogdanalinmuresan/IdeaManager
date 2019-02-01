export class Upload {
    $key: string;
    file: File;
    name: string;
    originalName: string;
    url: string;
    progress: number = 0;
    createdAt: Date = new Date();
    type: string;

    constructor(file?:File) {
        this.file = file;
    }
}
