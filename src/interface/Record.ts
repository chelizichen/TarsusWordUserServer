import {baseRes, getCurrRecordLenRes, getUserRecordRes, queryIdReq, setRecordReq} from "../struct/Record";
import {TarsusReflect} from "tarsus/core/microservice";

interface Record {
    getUserRecord(Request: queryIdReq, Response: getUserRecordRes): Promise<getUserRecordRes>

    addUserRecord(Request: queryIdReq, Response: baseRes): Promise<baseRes>

    delUserRecord(Request: queryIdReq, Response: baseRes): Promise<baseRes>

    setRecord(Request: setRecordReq, Response: baseRes): Promise<baseRes>

    getCurrRecordLen(Request: queryIdReq, Response: getCurrRecordLenRes): Promise<getCurrRecordLenRes>

}

@TarsusReflect("WordNodeServer","record")
class RecordImpl implements Record {
    getUserRecord(Request: queryIdReq, Response: getUserRecordRes): Promise<getUserRecordRes> {
        throw new Error("Method not implemented.");
    }
    addUserRecord(Request: queryIdReq, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
    delUserRecord(Request: queryIdReq, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
    setRecord(Request: setRecordReq, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
    getCurrRecordLen(Request: queryIdReq, Response: getCurrRecordLenRes): Promise<getCurrRecordLenRes> {
        throw new Error("Method not implemented.");
    }

}

export default RecordImpl