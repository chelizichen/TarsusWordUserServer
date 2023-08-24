import {
    getPlanDetailByIdRes,
    getPlanWordsByIdRes,
    getUserPlanByIdRes,
    getUserPlansRes,
    PlanDetail, PlanWords
} from "../struct/Plan";
import {TarsusReflect} from 'tarsus/core/microservice'
import {baseRes, queryIdReq} from "../struct/Record";
import {WordNodeProxy} from "../components/proxy";

interface PlanInf {
    getLatestPlanByUser(Request: queryIdReq, Response: getPlanDetailByIdRes): Promise<getPlanDetailByIdRes>

    getPlansByUser(Request: queryIdReq, Response: getUserPlansRes): Promise<getUserPlansRes>

    getPlanById(Request: queryIdReq, Response: getPlanDetailByIdRes): Promise<getPlanDetailByIdRes>

    getPlanWordsById(Request: queryIdReq, Response: getPlanWordsByIdRes): Promise<getPlanWordsByIdRes>

    markPlanWords(Request: queryIdReq, Response: baseRes): Promise<baseRes>

    markPlan(Request: queryIdReq, Response: baseRes): Promise<baseRes>

    delPlan(Request: queryIdReq, Response: baseRes): Promise<baseRes>

    delPlanWords(Request: queryIdReq, Response: baseRes): Promise<baseRes>

    savePlan(Request: PlanDetail, Response: baseRes): Promise<baseRes>

    savePlanWords(Request: PlanWords, Response: baseRes): Promise<baseRes>
}
@WordNodeProxy("plan")
class PlanImpl implements PlanInf {
    getLatestPlanByUser(Request: queryIdReq, Response: getPlanDetailByIdRes): Promise<getPlanDetailByIdRes> {
        throw new Error("Method not implemented.");
    }
    getPlansByUser(Request: queryIdReq, Response: getUserPlansRes): Promise<getUserPlansRes> {
        throw new Error("Method not implemented.");
    }
    getPlanById(Request: queryIdReq, Response: getPlanDetailByIdRes): Promise<getPlanDetailByIdRes> {
        throw new Error("Method not implemented.");
    }
    getPlanWordsById(Request: queryIdReq, Response: getPlanWordsByIdRes): Promise<getPlanWordsByIdRes> {
        throw new Error("Method not implemented.");
    }
    markPlanWords(Request: queryIdReq, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
    markPlan(Request: queryIdReq, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
    delPlan(Request: queryIdReq, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
    delPlanWords(Request: queryIdReq, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
    savePlan(Request: PlanDetail, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
    savePlanWords(Request: PlanWords, Response: baseRes): Promise<baseRes> {
        throw new Error("Method not implemented.");
    }
}

export default PlanImpl;