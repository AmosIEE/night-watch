interface UploaderParams {
    projectName: string;
    env?: string;
}

class Uploader {
    private readonly projectName: string;
    private endPoint: string;

    constructor(params: UploaderParams) {
        this.projectName = params.projectName;
        this.endPoint = params.env || 'test';
        this.sendLog = this.sendLog.bind(this);
    }

    public sendLog(type: string, message: object) {
        console.log(this.projectName, type, message);
    }
}

export default Uploader;
