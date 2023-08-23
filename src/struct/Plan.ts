import {User} from "./User";

const {TarsusReadStream} = require("tarsus-cli/taro");

export class PlanDetail {
    public id: number;
    public user_id: string;
    public is_mark: string;
    public plan_start_time: string;
    public plan_end_time: string;
    public create_time: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("PlanDetail", args);
        this.id = _TarsusReadStream.read_int(1);
        this.user_id = _TarsusReadStream.read_string(2);
        this.is_mark = _TarsusReadStream.read_string(3);
        this.plan_start_time = _TarsusReadStream.read_string(4);
        this.plan_end_time = _TarsusReadStream.read_string(5);
        this.create_time = _TarsusReadStream.read_string(6);
    }
};

export class PlanWords {
    public word_ids: string;
    public mark_date: string;
    public is_mark: number;
    public user_id: string;
    public plan_id: string;
    public id: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("PlanWords", args);
        this.word_ids = _TarsusReadStream.read_string(1);
        this.mark_date = _TarsusReadStream.read_string(2);
        this.is_mark = _TarsusReadStream.read_int(3);
        this.user_id = _TarsusReadStream.read_string(4);
        this.plan_id = _TarsusReadStream.read_string(5);
        this.id = _TarsusReadStream.read_int(6);
    }
};

export class getUserPlanByIdRes {
    public user: User;
    public data: Array<PlanWords>;
    public code: number;
    public total: number;
    public message: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getUserPlanByIdRes", args);
        this.user = _TarsusReadStream.read_struct(1, "User");
        this.data = _TarsusReadStream.read_list(2, "List<PlanWords>");
        this.code = _TarsusReadStream.read_int(3);
        this.total = _TarsusReadStream.read_int(4);
        this.message = _TarsusReadStream.read_string(5);
    }
};

export class getPlanDetailByIdRes {
    public data: PlanDetail;
    public code: number;
    public message: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getPlanDetailByIdRes", args);
        this.data = _TarsusReadStream.read_struct(1, "PlanDetail");
        this.code = _TarsusReadStream.read_int(2);
        this.message = _TarsusReadStream.read_string(3);
    }
};

export class getUserPlansRes {
    public data: Array<PlanDetail>;
    public code: number;
    public message: string;
    public total: number;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getUserPlansRes", args);
        this.data = _TarsusReadStream.read_list(1, "List<PlanDetail>");
        this.code = _TarsusReadStream.read_int(2);
        this.message = _TarsusReadStream.read_string(3);
        this.total = _TarsusReadStream.read_int(4);
    }
};

export class getPlanWordsByIdRes {
    public data: PlanWords;
    public code: number;
    public message: string;

    constructor(...args: any[]) {
        const _TarsusReadStream = new TarsusReadStream("getPlanWordsByIdRes", args);
        this.data = _TarsusReadStream.read_struct(1, "PlanWords");
        this.code = _TarsusReadStream.read_int(2);
        this.message = _TarsusReadStream.read_string(3);
    }
};
