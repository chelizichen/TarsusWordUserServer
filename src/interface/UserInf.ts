import {
    baseRes,
    batchSetUserReq,
    getUserByIdRes,
    getUserListReq,
    getUserListRes,
    queryIdReq,
    queryIdsReq, User
} from "../struct/User";
import {Stream, TarsusInterFace, TarsusMethod} from "tarsus/core/microservice";
import {$PoolConn} from "tarsus/core/database";
import {$BuildIn, $ExcuteQuery, $QueryOne, $Resolve} from "../utils/queryBuilder";

interface UserInf {
    getUserList(Request: getUserListReq, Response: getUserListRes): Promise<getUserListRes>

    getUserById(Request: queryIdReq, Response: getUserByIdRes): Promise<getUserByIdRes>

    delUserById(Request: queryIdReq, Response: baseRes): Promise<baseRes>

    saveUser(Request: User, Response: baseRes): Promise<baseRes>

    batchDelUser(Request: queryIdsReq, Response: baseRes): Promise<baseRes>

    batchSetUser(Request: batchSetUserReq, Response: baseRes): Promise<baseRes>
}

@TarsusInterFace("record")
class UserImpl implements UserInf {
    @TarsusMethod
    @Stream("queryIdReq", "getUserByIdRes")
    async getUserById(Request: queryIdReq, Response: getUserByIdRes): Promise<getUserByIdRes> {
        const id = Request.id
        let sql = `
        select * from user where id = ?
        `
        let params = [id]
        const data = await $ExcuteQuery<User>(sql,params)
        if(data.code){
            Response.code = data.code;
            Response.message = data.message;
           return  Promise.resolve(Response)
        }
        Response.data = data.data[0]
        $Resolve(Response,data)
        return Promise.resolve(Response);
    }

    @TarsusMethod
    @Stream("getUserListReq", "getUserListRes")
    getUserList(Request: getUserListReq, Response: getUserListRes): Promise<getUserListRes> {
        return Promise.resolve(undefined);
    }

    @TarsusMethod
    @Stream("queryIdsReq", "baseRes")
    async batchDelUser(Request: queryIdsReq, Response: baseRes): Promise<baseRes> {
        const ids = Request.ids
        let ids_in = $BuildIn(ids);
        let sql = `
        delete  from user where id in ?
        `
        let params = [ids_in];
        let data = await $ExcuteQuery(sql,params);
        $Resolve(Response,data);
        Response.message = data.code?"删除失败":"删除成功"
        return Promise.resolve(Response);
    }

    @TarsusMethod
    @Stream("batchSetUserReq", "baseRes")
    batchSetUser(Request: batchSetUserReq, Response: baseRes): Promise<baseRes> {
        Response.code = 0
        Response.message = 'ok';
        let ids = Request.ids
        if(!ids.length){
            return Promise.resolve(Response)
        }
        let info = Request.info
        let {username,password,role_name,level} = info
        let buildIds = $BuildIn(ids)
        let sql = `
            update user set username = ?,password = ?,role_name = ?, level = ?  where id in ${buildIds}
        `
        let params = [username,password,role_name,level]
        return new Promise(async(resolve)=>{
            const conn = await $PoolConn()
            conn.query(sql,params,function (err, results){
                if(err){
                    Response.code = 600
                    Response.message = "ok"
                    resolve(Response)
                    return conn.release();
                }
                resolve(Response)
                return conn.release();
            })
        });
    }

    @TarsusMethod
    @Stream("queryIdReq", "baseRes")
    delUserById(Request: queryIdReq, Response: baseRes): Promise<baseRes> {
        const id = Request.id
        let sql = `
        delete  from user where id = ?
        `
        let params = [id]
        return new Promise(async (resolve) => {
            Response.code = 0
            Response.message = "ok"
            const conn = await $PoolConn()
            conn.query(sql, params, (err, resu) => {
                if (err) {
                    Response.message = err.message;
                    Response.code = 600;
                    resolve(Response)
                    conn.release()
                    return
                }
                resolve(Response)
                conn.release()
            })
        });
    }

    @TarsusMethod
    @Stream("User", "baseRes")
    saveUser(Request: User, Response: baseRes): Promise<baseRes> {
        return Promise.resolve(undefined);
    }

}

export default UserImpl