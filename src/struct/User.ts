const {TarsusReadStream} = require("tarsus-cli/taro");

export class User {
    public id: number;
    public username: string;
    public password: string;
    public email: string;
    public phone: string;
    public role_name: string;
    public level: string;
    public create_time: string;
    public update_time: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("User", args);
        this.id = _TarsusReadStream.read_int(1);
        this.username = _TarsusReadStream.read_string(2);
        this.password = _TarsusReadStream.read_string(3);
        this.email = _TarsusReadStream.read_string(4);
        this.phone = _TarsusReadStream.read_string(5);
        this.role_name = _TarsusReadStream.read_string(6);
        this.level = _TarsusReadStream.read_string(7);
        this.create_time = _TarsusReadStream.read_string(8);
        this.update_time = _TarsusReadStream.read_string(9);
    }
};

export class queryIdReq {
    public id: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("queryIdReq", args);
        this.id = _TarsusReadStream.read_int(1);
    }
};

export class queryIdsReq {
    public ids: Array<number>;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("queryIdsReq", args);
        this.ids = _TarsusReadStream.read_list(1, "List<int>");
    }
};

export class userBaseInfo {
    public id: number;
    public user_name: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("userBaseInfo", args);
        this.id = _TarsusReadStream.read_int(1);
        this.user_name = _TarsusReadStream.read_string(2);
    }
};

export class queryUsersNameRes {
    public users: Array<userBaseInfo>;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("queryUsersNameRes", args);
        this.users = _TarsusReadStream.read_list(1, "List<userBaseInfo>");
    }
};

export class batchSetUserReq {
    public ids: Array<number>;
    public info: User;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("batchSetUserReq", args);
        this.ids = _TarsusReadStream.read_list(1, "List<int>");
        this.info = _TarsusReadStream.read_struct(2, "User");
    }
};

export class getUserListReq {
    public keyword: string;
    public page: number;
    public size: number;
    public start_time: string;
    public end_time: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getUserListReq", args);
        this.keyword = _TarsusReadStream.read_string(1);
        this.page = _TarsusReadStream.read_int(2);
        this.size = _TarsusReadStream.read_int(3);
        this.start_time = _TarsusReadStream.read_string(4);
        this.end_time = _TarsusReadStream.read_string(5);
    }
};

export class getUserListRes {
    public code: number;
    public message: string;
    public list: Array<User>;
    public total: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getUserListRes", args);
        this.code = _TarsusReadStream.read_int(1);
        this.message = _TarsusReadStream.read_string(2);
        this.list = _TarsusReadStream.read_list(3, "List<User>");
        this.total = _TarsusReadStream.read_int(4);
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

export class getUserByIdRes {
    public code: number;
    public message: string;
    public data: User;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getUserByIdRes", args);
        this.code = _TarsusReadStream.read_int(1);
        this.message = _TarsusReadStream.read_string(2);
        this.data = _TarsusReadStream.read_struct(3, "User");
    }
};
