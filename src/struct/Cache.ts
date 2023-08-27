const {TarsusReadStream} = require("tarsus-cli/taro");

export class SetCacheRes {
    public code: string;
    public message: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("SetCacheRes", args);
        this.code = _TarsusReadStream.read_string(1);
        this.message = _TarsusReadStream.read_string(2);
    }
};

export class SetCacheReq {
    public key: string;
    public value: string;
    public keys: Array<string>;
    public values: Array<string>;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("SetCacheReq", args);
        this.key = _TarsusReadStream.read_string(1);
        this.value = _TarsusReadStream.read_string(2);
        this.keys = _TarsusReadStream.read_list(3, "List<string>");
        this.values = _TarsusReadStream.read_list(4, "List<string>");
    }
};

export class GetCacheReq {
    public key: string;
    public keys: Array<string>;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("GetCacheReq", args);
        this.key = _TarsusReadStream.read_string(1);
        this.keys = _TarsusReadStream.read_list(2, "List<string>");
    }
};

export class GetCacheRes {
    public value: string;
    public values: Array<string>;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("GetCacheRes", args);
        this.value = _TarsusReadStream.read_string(1);
        this.values = _TarsusReadStream.read_list(2, "List<string>");
    }
};

export class getWordsByIdsReq {
    public ids: Array<number>;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getWordsByIdsReq", args);
        this.ids = _TarsusReadStream.read_list(1, "List<int>");
    }
};

export class cacheWord {
    public en_word: string;
    public user_name: string;
    public user_id: string;
    public own_mark: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("cacheWord", args);
        this.en_word = _TarsusReadStream.read_string(1);
        this.user_name = _TarsusReadStream.read_string(2);
        this.user_id = _TarsusReadStream.read_string(3);
        this.own_mark = _TarsusReadStream.read_string(4);
    }
};

export class getWordsByIdsRes {
    public code: number;
    public message: string;
    public list: Array<cacheWord>;
    public total: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getWordsByIdsRes", args);
        this.code = _TarsusReadStream.read_int(1);
        this.message = _TarsusReadStream.read_string(2);
        this.list = _TarsusReadStream.read_list(3, "List<cacheWord>");
        this.total = _TarsusReadStream.read_int(4);
    }
};
