import {TarsusInterFace, TarsusMethod, Stream} from "tarsus/core/microservice";
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

@TarsusInterFace("word")
class WordImpl implements WordServerInf {
    @TarsusMethod
    @Stream("getWordListReq", "getWordListRes")
    getWordList(Request: getWordListReq, Response: getWordListRes): Promise<getWordListRes> {
        return new Promise(async (resolve, reject) => {
            const {page = 1, size = 10, keyword = '', start_time, desc = "1", end_time} = Request
            const conn = await $PoolConn();
            let current = (page - 1) * 10;
            let where = ' where 1 = 1 '
            let select = `
select words.*,COUNT(word_translates.id) AS total_trans 
from words 
LEFT JOIN word_translates ON words.id = word_translates.word_id
`
            if (Request.type > 0) {
                where += ` and type = ${Request.type} `
            }
            let total = 'select count(*) as total from words';
            let limit = `limit ${current},${size}`
            if (keyword) {
                where += ` and en_name like %${keyword}% `
            }
            if (start_time && end_time) {
                where += ` and create_time between ${start_time} and ${end_time} `
            }
            where += ` GROUP BY words.id order by create_time ${desc == "1" ? 'desc' : ''} `

            let signal = {
                total: false,
                list: false
            }

            conn.query(total + where, function (_, resu) {
                console.log('total', total + where)
                console.log('total', resu[0])
                // Response.total = resu[0].total;
                Response.total = resu[0].total;
                signal.total = true
                if (signal.total && signal.list) {
                    resolve(Response)
                    console.log("释放链接,total")
                    conn.release()
                }

            })

            conn.query(select + where + limit, function (_, resu) {
                console.log('select', select + where + limit)
                console.log('select', resu)
                const ids = resu.map(item => item.id);

                let buildIds = $BuildIn(ids)
                let get_words_translates_sql = `
                select cn_name,en_type,word_id from word_translates where word_id in ${buildIds}
                `
                conn.query(get_words_translates_sql, (_, wordResu) => {
                    let WordsResu = {};

                    for (let i = 0; i < wordResu.length; i++) {
                        let item = wordResu[i]
                        const {word_id} = item
                        if (!WordsResu[word_id]) {
                            WordsResu[word_id] = []
                        }
                        WordsResu[word_id].push(item)
                    }
                    Response.list = resu.map(item => {
                        item.word_translates = JSON.stringify(WordsResu[item.id] || "{}")
                        item.create_time = moment(item.create_time).format("YYYY-MM-DD HH:mm:ss")
                        item.update_time = moment(item.update_time).format("YYYY-MM-DD HH:mm:ss")
                        return item;
                    });
                    signal.list = true
                    if (signal.total && signal.list) {
                        resolve(Response)
                        console.log("释放链接,limit")
                        conn.release()
                    }
                })

            })

        })
    }

    @TarsusMethod
    @Stream("getTranslateListReq", "getTranslateListRes")
    getTranslateList(Request: getTranslateListReq, Response: getTranslateListRes): Promise<getTranslateListRes> {
        return new Promise(async (resolve, reject) => {
            const {page = 1, size = 10, keyword = '', start_time, desc = "1", end_time} = Request
            const conn = await $PoolConn();
            let current = (page - 1) * 10;
            let where = ' where 1 = 1 and '
            let select = 'select * from words'
            let total = 'select (*) as total from words';
            let limit = `limit${current},${size}`
            if (keyword) {
                where += ` en_name like %${keyword}% and `
            }
            if (start_time && end_time) {
                where += `create_time between ${start_time} and ${end_time}`
            }
            where += `order by create_time ${desc == "1" ? 'desc' : ''}`

            let signal = {
                total: false,
                list: false
            }

            conn.query(total + where, function (_, resu) {
                Response.total = resu[0].total;
                signal.total = true
                if (signal.total && signal.list) {
                    resolve(Response)
                }

            })

            conn.query(select + where + limit, function (_, resu) {
                Response.list = resu.map(item => {
                    item.create_time = moment(item.create_time).format("YYYY-MM-DD HH:mm:ss")
                    return item;
                });
                signal.list = true
                if (signal.total && signal.list) {
                    resolve(Response)
                }
            })

        })
    }

    @TarsusMethod
    @Stream("queryIdReq", "DelOrSaveRes")
    delWordById(Request: queryIdReq, Response: DelOrSaveRes): Promise<DelOrSaveRes> {
        return new Promise(async (resolve, reject) => {
            const conn = await $PoolConn();
            let sql = `delete from words where id = ${Request.id}`;
            conn.query(sql, function () {
                Response.message = "删除成功";
                resolve(Response)
            })
        })
    }

    @TarsusMethod
    @Stream("queryIdReq", "DelOrSaveRes")
    delTranslateByID(Request: queryIdReq, Response: DelOrSaveRes): Promise<DelOrSaveRes> {
        return new Promise(async (resolve, reject) => {
            const conn = await $PoolConn();
            let sql = `delete from word_translates where id = ${Request.id}`;
            conn.query(sql, function () {
                Response.message = "删除成功";
                resolve(Response)
            })
        })
    }

    @TarsusMethod
    @Stream("Word", "DelOrSaveRes")
    saveWord(Request: Word, Response: DelOrSaveRes): Promise<DelOrSaveRes> {
        const {en_name, create_time, own_mark, type} = Request
        const params = [en_name, create_time, own_mark, type]
        let sql = `
            insert into words(en_name,create_time,own_mark,type)values(?,?,?,?)
        `
        return new Promise(async (resolve, reject) => {
            const conn = await $PoolConn();
            conn.query(sql, params, (err) => {
                if (err) {
                    Response.code = 600
                    Response.message = "db insert error " + sql;
                    resolve(Response)
                } else {
                    Response.code = 0;
                    Response.message = "插入成功"
                    resolve(Response)
                }
                conn.release();
            })
        })
    }

    @TarsusMethod
    @Stream("WordTranslate", "DelOrSaveRes")
    saveTranslate(Request: WordTranslate, Response: DelOrSaveRes): Promise<DelOrSaveRes> {
        let {en_type, cn_name, create_time = '', own_mark, word_id} = Request;
        const params = [en_type, cn_name, create_time, own_mark, word_id]
        if (!create_time) {
            create_time = moment().format("YYYY-MM-DD HH:mm:ss")
        }
        let sql = `
            insert into word_translates(en_type,cn_name,create_time,own_mark,word_id)
            values (?,?,?,?,?)
        `
        let update_time_sql = `
            update words set update_time = '${create_time}' where id = ${word_id};
        `
        console.log("update_time_sql",update_time_sql)

        return new Promise(async (resolve, reject) => {
            const conn = await $PoolConn();
            let single = 0
            conn.query(update_time_sql, function () {
                if (!single) {
                    return single++
                }
                return conn.release();
            })
            conn.query(sql, params, (err) => {
                if (err) {
                    Response.code = 600
                    Response.message = "db insert error " + sql;
                    resolve(Response)
                }

                Response.code = 0;
                Response.message = "插入成功"
                resolve(Response)
                if (!single) {
                    return single++
                }
                return conn.release();
            })
        })
    }

    @TarsusMethod
    @Stream("queryIdReq", "getTranslateListRes")
    getTranslateListById(Request: queryIdReq, Response: getTranslateListRes): Promise<getTranslateListRes> {
        const conn = $PoolConn();
        let sql = 'select * from word_translates where word_id = ?';
        let params = [Request.id];
        return new Promise(async (resolve, reject) => {
            const conn = await $PoolConn();
            conn.query(sql, params, (err, resu) => {
                if (err) {
                    Response.code = 600
                    Response.total = 0
                    resolve(Response)
                    return
                }
                Response.code = 0
                Response.list = resu.map(item => {
                    item.create_time = moment(item.create_time).format("YYYY-MM-DD")
                    return item;
                });
                Response.total = resu.length;
                resolve(Response)
                conn.release();
            })
        })
    }

}

export default WordImpl