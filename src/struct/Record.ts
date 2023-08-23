const {TarsusReadStream} = require("tarsus-cli/taro");

export class Record {
    public id: number;
    public create_time: string;
    public is_register: string;
    public user_id: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("Record", args);
        this.id = _TarsusReadStream.read_int(1);
        this.create_time = _TarsusReadStream.read_string(2);
        this.is_register = _TarsusReadStream.read_string(3);
        this.user_id = _TarsusReadStream.read_string(4);
    }
};

export class queryIdReq {
    public id: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("queryIdReq", args);
        this.id = _TarsusReadStream.read_int(1);
    }
};

export class getUserRecordRes {
    public user_id: number;
    public data: Array<Record>;
    public code: number;
    public total: number;
    public message: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getUserRecordRes", args);
        this.user_id = _TarsusReadStream.read_int(1);
        this.data = _TarsusReadStream.read_list(2, "List<Record>");
        this.code = _TarsusReadStream.read_int(3);
        this.total = _TarsusReadStream.read_int(4);
        this.message = _TarsusReadStream.read_string(5);
    }
};

export class baseRes {
    public code: number;
    public message: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("baseRes", args);
        this.code = _TarsusReadStream.read_int(1);
        this.message = _TarsusReadStream.read_string(2);
    }
};

export class setRecordReq {
    public user_id: number;
    public record_time: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("setRecordReq", args);
        this.user_id = _TarsusReadStream.read_int(1);
        this.record_time = _TarsusReadStream.read_string(2);
    }
};

export class getCurrRecordLenRes {
    public record_length: number;
    public user_name: number;
    public code: number;
    public message: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getCurrRecordLenRes", args);
        this.record_length = _TarsusReadStream.read_int(1);
        this.user_name = _TarsusReadStream.read_int(2);
        this.code = _TarsusReadStream.read_int(3);
        this.message = _TarsusReadStream.read_int(4);
    }
};
