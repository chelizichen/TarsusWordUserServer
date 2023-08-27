import {GetCacheReq, GetCacheRes, getWordsByIdsReq, getWordsByIdsRes, SetCacheReq, SetCacheRes} from "../struct/Cache";
import {Stream, TarsusInterFace, TarsusMethod} from "tarsus/core/microservice";
import Schedule from '../components/schedule'

interface CacheInf {
    setCache(Request: SetCacheReq, Response: SetCacheRes): Promise<SetCacheRes>

    GetCache(Request: GetCacheReq, Response: GetCacheRes): Promise<GetCacheRes>

    getCacheWords(Request: getWordsByIdsReq, Response: getWordsByIdsRes): Promise<getWordsByIdsRes>

}

@TarsusInterFace("cache")
class CacheImpl implements CacheInf {
    @TarsusMethod
    @Stream("SetCacheReq","SetCacheRes")
    setCache(Request: SetCacheReq, Response: SetCacheRes): Promise<SetCacheRes> {
        throw new Error("Method not implemented.");
    }
    @TarsusMethod
    @Stream("GetCacheReq","GetCacheRes")
    GetCache(Request: GetCacheReq, Response: GetCacheRes): Promise<GetCacheRes> {
        throw new Error("Method not implemented.");
    }
    @TarsusMethod
    @Stream("getWordsByIdsReq","getWordsByIdsRes")
    getCacheWords(Request: getWordsByIdsReq, Response: getWordsByIdsRes): Promise<getWordsByIdsRes> {
        const ids= Request.ids;
        const resu = []
        for(let v of ids){
            resu.push(Schedule.wordMap[v])
        }
        Response.code = 0;
        Response.total = resu.length;
        Response.message = "ok"
        Response.list = resu;
        return Promise.resolve(Response);
    }

}

export default CacheImpl