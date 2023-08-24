import {TarsusInterFace, TarsusMethod, Stream, TarsusReflect} from "tarsus/core/microservice";
import {$PoolConn} from 'tarsus/core/database'
import moment from 'moment'
//
import {
    getWordListReq,
    getWordListRes,
    getTranslateListReq,
    getTranslateListRes,
    DelOrSaveRes,
    Word,
    WordTranslate
} from "../struct/Word";
import {sign} from "crypto";
import {queryIdReq} from "../struct/Record";
import {type} from "os";
import {$BuildIn} from "../utils/queryBuilder";
import lodash from 'lodash'

interface WordServerInf {
    getWordList(Request: getWordListReq, Response: getWordListRes): Promise<getWordListRes>

    getTranslateList(Request: getTranslateListReq, Response: getTranslateListRes): Promise<getTranslateListRes>

    delWordById(Request: queryIdReq, Response: DelOrSaveRes): Promise<DelOrSaveRes>

    delTranslateByID(Request: queryIdReq, Response: DelOrSaveRes): Promise<DelOrSaveRes>

    saveWord(Request: Word, Response: DelOrSaveRes): Promise<DelOrSaveRes>

    saveTranslate(Request: WordTranslate, Response: DelOrSaveRes): Promise<DelOrSaveRes>

    getTranslateListById(Request: queryIdReq, Response: getTranslateListRes): Promise<getTranslateListRes>

}

@TarsusReflect("WordNodeServer","word")
class WordImpl implements WordServerInf {
    getWordList(Request: getWordListReq, Response: getWordListRes): Promise<getWordListRes> {
        throw new Error("Method not implemented.");
    }
    getTranslateList(Request: getTranslateListReq, Response: getTranslateListRes): Promise<getTranslateListRes> {
        throw new Error("Method not implemented.");
    }
    delWordById(Request: queryIdReq, Response: DelOrSaveRes): Promise<DelOrSaveRes> {
        throw new Error("Method not implemented.");
    }
    delTranslateByID(Request: queryIdReq, Response: DelOrSaveRes): Promise<DelOrSaveRes> {
        throw new Error("Method not implemented.");
    }
    saveWord(Request: Word, Response: DelOrSaveRes): Promise<DelOrSaveRes> {
        throw new Error("Method not implemented.");
    }
    saveTranslate(Request: WordTranslate, Response: DelOrSaveRes): Promise<DelOrSaveRes> {
        throw new Error("Method not implemented.");
    }
    getTranslateListById(Request: queryIdReq, Response: getTranslateListRes): Promise<getTranslateListRes> {
        throw new Error("Method not implemented.");
    }
    
}

export default WordImpl