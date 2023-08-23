const {TarsusReadStream} = require("tarsus-cli/taro");

export class Word {
    public id: number;
    public en_name: string;
    public create_time: string;
    public own_mark: string;
    public type: string;
    public total_trans: number;
    public user_id: number;
    public word_translates: string;
    public update_time: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("Word", args);
        this.id = _TarsusReadStream.read_int(1);
        this.en_name = _TarsusReadStream.read_string(2);
        this.create_time = _TarsusReadStream.read_string(3);
        this.own_mark = _TarsusReadStream.read_string(4);
        this.type = _TarsusReadStream.read_string(5);
        this.total_trans = _TarsusReadStream.read_int(6);
        this.user_id = _TarsusReadStream.read_int(7);
        this.word_translates = _TarsusReadStream.read_string(8);
        this.update_time = _TarsusReadStream.read_string(9);
    }
};

export class WordTranslate {
    public id: number;
    public cn_name: string;
    public en_type: string;
    public own_mark: string;
    public create_time: string;
    public word_id: number;
    public user_id: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("WordTranslate", args);
        this.id = _TarsusReadStream.read_int(1);
        this.cn_name = _TarsusReadStream.read_string(2);
        this.en_type = _TarsusReadStream.read_string(3);
        this.own_mark = _TarsusReadStream.read_string(4);
        this.create_time = _TarsusReadStream.read_string(5);
        this.word_id = _TarsusReadStream.read_int(6);
        this.user_id = _TarsusReadStream.read_int(7);
    }
};

export class DelOrSaveRes {
    public code: number;
    public message: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("DelOrSaveRes", args);
        this.code = _TarsusReadStream.read_int(1);
        this.message = _TarsusReadStream.read_string(2);
    }
};

export class getWordListReq {
    public desc: string;
    public keyword: string;
    public page: number;
    public size: number;
    public start_time: string;
    public end_time: string;
    public user_id: number;
    public type: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getWordListReq", args);
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

export class getWordListRes {
    public code: number;
    public list: Array<Word>;
    public total: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getWordListRes", args);
        this.code = _TarsusReadStream.read_int(1);
        this.list = _TarsusReadStream.read_list(2, "List<Word>");
        this.total = _TarsusReadStream.read_int(3);
    }
};

export class getTranslateListReq {
    public desc: string;
    public keyword: string;
    public page: number;
    public size: number;
    public start_time: string;
    public end_time: string;
    public user_id: number;
    public type: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getTranslateListReq", args);
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

export class getTranslateListRes {
    public code: number;
    public list: Array<WordTranslate>;
    public total: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getTranslateListRes", args);
        this.code = _TarsusReadStream.read_int(1);
        this.list = _TarsusReadStream.read_list(2, "List<WordTranslate>");
        this.total = _TarsusReadStream.read_int(3);
    }
};
