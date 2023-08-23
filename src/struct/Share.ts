const {TarsusReadStream} = require("tarsus-cli/taro");

export class getListBaseReq {
    public desc: string;
    public keyword: string;
    public page: number;
    public size: number;
    public start_time: string;
    public end_time: string;
    public user_id: number;
    public type: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getListBaseReq", args);
        this.desc = _TarsusReadStream.read_string(1);
        this.keyword = _TarsusReadStream.read_string(2);
        this.page = _TarsusReadStream.read_int(3);
        this.size = _TarsusReadStream.read_int(4);
        this.start_time = _TarsusReadStream.read_string(5);
        this.end_time = _TarsusReadStream.read_string(6);
        this.user_id = _TarsusReadStream.read_int(7);
        this.type = _TarsusReadStream.read_int(8);
    }
};

export class ShareInfo {
    public id: number;
    public user_id: number;
    public create_time: string;
    public img: string;
    public update_time: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("ShareInfo", args);
        this.id = _TarsusReadStream.read_int(1);
        this.user_id = _TarsusReadStream.read_int(2);
        this.create_time = _TarsusReadStream.read_string(3);
        this.img = _TarsusReadStream.read_string(4);
        this.update_time = _TarsusReadStream.read_string(5);
    }
};

export class ShareDetail {
    public id: number;
    public content: string;
    public word_ids_list: string;
    public share_id: number;
    public update_time: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("ShareDetail", args);
        this.id = _TarsusReadStream.read_int(1);
        this.content = _TarsusReadStream.read_string(2);
        this.word_ids_list = _TarsusReadStream.read_string(3);
        this.share_id = _TarsusReadStream.read_int(4);
        this.update_time = _TarsusReadStream.read_string(5);
    }
};

export class starShareReq {
    public share_id: number;
    public num: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("starShareReq", args);
        this.share_id = _TarsusReadStream.read_int(1);
        this.num = _TarsusReadStream.read_int(2);
    }
};

export class shareToUserReq {
    public share_id: number;
    public user_id: number;
    public to_user_id: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("shareToUserReq", args);
        this.share_id = _TarsusReadStream.read_int(1);
        this.user_id = _TarsusReadStream.read_int(2);
        this.to_user_id = _TarsusReadStream.read_int(3);
    }
};

export class getShareListRes {
    public code: number;
    public message: string;
    public list: Array<ShareInfo>;
    public total: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getShareListRes", args);
        this.code = _TarsusReadStream.read_int(1);
        this.message = _TarsusReadStream.read_string(2);
        this.list = _TarsusReadStream.read_list(3, "List<ShareInfo>");
        this.total = _TarsusReadStream.read_int(4);
    }
};
