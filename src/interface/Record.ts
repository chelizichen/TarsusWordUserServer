import {baseRes, getCurrRecordLenRes, getUserRecordRes, queryIdReq, setRecordReq} from "../struct/Record";
import {Stream, TarsusInterFace, TarsusMethod} from "tarsus/core/microservice";

interface Record {
    getUserRecord(Request: queryIdReq, Response: getUserRecordRes): Promise<getUserRecordRes>

    addUserRecord(Request: queryIdReq, Response: baseRes): Promise<baseRes>

    delUserRecord(Request: queryIdReq, Response: baseRes): Promise<baseRes>

    setRecord(Request: setRecordReq, Response: baseRes): Promise<baseRes>

    getCurrRecordLen(Request: queryIdReq, Response: getCurrRecordLenRes): Promise<getCurrRecordLenRes>

}

@TarsusInterFace("record")
class RecordImpl implements Record {

    // 补签，带时间选项
    @TarsusMethod
    @Stream('setRecordReq', 'baseRes')
    setRecord(Request: setRecordReq, Response: baseRes): Promise<baseRes> {
        return Promise.resolve(undefined);
    }

    // 获取当前连续签到时间
    @TarsusMethod
    @Stream('queryIdReq', 'getCurrRecordLenRes')
    getCurrRecordLen(Request: queryIdReq, Response: getCurrRecordLenRes): Promise<getCurrRecordLenRes> {
        return Promise.resolve(undefined);
    }

    // 签到
    @TarsusMethod
    @Stream('queryIdReq', 'baseRes')
    addUserRecord(Request: queryIdReq, Response: baseRes): Promise<baseRes> {
        return Promise.resolve(undefined);
    }
    // 删除用户签到记录
    @TarsusMethod
    @Stream('queryIdReq', 'baseRes')
    delUserRecord(Request: queryIdReq, Response: baseRes): Promise<baseRes> {
        return Promise.resolve(undefined);
    }

    // 拿到单个用户签到记录列表
    @TarsusMethod
    @Stream('queryIdReq', 'getUserRecordRes')
    getUserRecord(Request: queryIdReq, Response: getUserRecordRes): Promise<getUserRecordRes> {
        return Promise.resolve(undefined);
    }

}

export default RecordImpl