import {getListBaseReq, getShareListRes, ShareDetail, ShareInfo, shareToUserReq, starShareReq} from "../struct/Share";
import {baseRes, queryIdReq} from "../struct/User";
import {TarsusReflect} from "tarsus/core/microservice";
import {WordNodeProxy} from "../components/proxy";

interface ShareInf {
    getShareList(Request: getListBaseReq, Response: getShareListRes): Promise<getShareListRes>

    shareToUser(Request: shareToUserReq, Response: baseRes): Promise<baseRes>

    starShare(Request: starShareReq, Response: baseRes): Promise<baseRes>

    saveShare(Request: ShareInfo, Response: baseRes): Promise<baseRes>

    saveShareDetail(Request: ShareDetail, Response: baseRes): Promise<baseRes>

    delShare(Request: queryIdReq, Response: baseRes): Promise<baseRes>

}

@WordNodeProxy("plan")
class ShareImpl implements ShareInf {
    getShareList(Request: getListBaseReq, Response: getShareListRes): Promise<getShareListRes> {
        throw new Error("Method not implemented.");
    }
    shareToUser(Request: shareToUserReq, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
    starShare(Request: starShareReq, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
    saveShare(Request: ShareInfo, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
    saveShareDetail(Request: ShareDetail, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
    delShare(Request: queryIdReq, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }

}