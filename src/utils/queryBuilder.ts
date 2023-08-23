import {$PoolConn} from "tarsus/core/database";

type filed = string | number;
type filedObj = Record<string, filed>
type filedIn = Array<filed>
type queryRet<T> = { code:number; message:string; data:T }
function $BuildIn(params: filedIn) {
    const check_args: boolean = (params instanceof Array)
    if (!check_args) {
        throw new Error(`Sql Build Error: ( params ${params.toString()} )`)
    }
    if (!params.length) {
        throw new Error(`Sql Build Error: ( length : 0 )  ( params ${params.toString()} )`)
    }
    const ret = '(' + params.toString() + ')'
    console.log(`Sql Build Success ( sql ${ret} )`);
    return ret
}

function $BuildDel(table: string, params: string | filedObj) {
    if (typeof params == "string" && !params.length) {
        throw new Error(`Sql Build Error: ( length : 0 )  ( params ${params} )`)
    }
    if (typeof params == "object" && !Object.keys(params).length) {
        throw new Error(`Sql Build Error: ( length : 0 )  ( params ${params} )`)
    }

    let table_sql = `delete from ${table} where 1 = 1 `
    if (typeof params == "string" && params.length) {
        table_sql += ` and ${params}`;
        console.log(`Sql Build Success ( sql ${table_sql} )`);
        return table_sql
    }
    if (typeof params == "object" && params != null) {
        for (let v in params) {
            table_sql += ` and ${v} = ${params[v]}`
        }
        console.log(`Sql Build Success ( sql ${table_sql} )`);
        return table_sql
    }
}

function $BuildSel(table: string, fields: string[] | string, params: string | filedObj) {
    if (typeof params == "string" && !params.length) {
        throw new Error(`Sql Build Error: ( length : 0 )  ( params ${params} )`)
    }
    if (typeof params == "object" && !Object.keys(params).length) {
        throw new Error(`Sql Build Error: ( length : 0 )  ( params ${params} )`)
    }
    if (fields instanceof Array) {
        fields = fields.toString()
    }

    let table_sql = `select ${fields} from ${table} where 1 = 1 `
    if (typeof params == "string" && params.length) {
        table_sql += ` and ${params}`;
        console.log(`Sql BuildIn Success ( sql ${table_sql} )`);
        return table_sql
    }
    if (typeof params == "object" && params != null) {
        for (let v in params) {
            table_sql += ` and ${v} = ${params[v]}`
        }
        console.log(`Sql BuildIn Success ( sql ${table_sql} )`);
        return table_sql
    }
}

function $QueryOne(table: string, fields: string[] | string, params: string | filedObj) {
    const sql = $BuildSel(table, fields, params)
    let ret = {code: 0, message: "ook", data: undefined}
    return new Promise(async (resolve) => {
        const conn = await $PoolConn()
        conn.query(sql, function (err, res) {
            if (err) {
                ret.code = 600;
                ret.message = err.message
                resolve(err)
                conn.release()
                return
            }
            ret.data = res[0]
            conn.release()
            resolve(ret)
        })
    })
}

function $QueryDel(table: string, params: string | filedObj): Promise<queryRet<undefined>> {
    const sql = $BuildDel(table, params);
    const ret: queryRet<undefined> = { code: 0, message: "ok", data: undefined }; // 注意这里的类型声明

    return new Promise<queryRet<undefined>>(async (resolve) => {
        const conn = await $PoolConn();
        conn.query(sql, function (err, res) {
            if (err) {
                ret.code = 600;
                ret.message = err.message;
                resolve(ret);
                conn.release();
                return;
            }
            conn.release();
            resolve(ret);
        });
    });
}

function $ExcuteQuery<K,T = Array<K> | undefined>(sql:string,params:Array<filed> = []):Promise<queryRet<T>>{
    const ret: queryRet<T> = { code: 0, message: "ok", data: undefined }; // 注意这里的类型声明
    return new Promise<queryRet<T>>(async (resolve) => {
        const conn = await $PoolConn();
        conn.query(sql,params, function (err, res) {
            if (err) {
                ret.code = 600;
                ret.message = err.message;
                ret.data = undefined
                resolve(ret);
                return conn.release();
            }
            ret.data = res;
            resolve(ret);
            return conn.release();
        });
    });
}

function $Resolve<T extends {code:any,message:any}>(Response:T,QueryResponse:queryRet<any>):T{
    Response.code = QueryResponse.code;
    Response.message = QueryResponse.message
    return Response
}

export  {
    $BuildIn,
    $BuildDel,
    $BuildSel,
    $QueryOne,
    $QueryDel,
    $ExcuteQuery,
    $Resolve
}
