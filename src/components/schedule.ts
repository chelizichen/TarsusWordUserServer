import {User} from "../struct/User";
import {$PoolConn} from "tarsus/core/database";
import {Schedule,Cron} from 'tarsus/core/schedule'
import * as lodash from 'lodash';
import moment from "moment";
import {cacheWord} from "../struct/Cache";

type user_id = string
type word_id = string;

type UserMap = Record<user_id, User>
type WordMap = Record<word_id, cacheWord>


@Schedule
class ScheduleServer {
    public userMap: UserMap = {}
    public wordMap :WordMap = {}
    public userSql = 'select * from users'
    public wordSql = 'select en_name as en_word,own_mark,user_id from words '
    // 每一天刷新一次
    @Cron("*/20 * * * *", true)
    public async UserCacheMethod() {
        const conn = await $PoolConn();
        const that = this;
        conn.query(that.userSql, function (_, resu) {
            if (!resu.length) {
                return
            }
            delete that.userMap;
            console.log("START-----------开始同步用户表", moment().format("YYYY-MM-DD"))
            that.userMap = lodash.keyBy(resu, "id")
            console.log('同步数据',JSON.stringify(that.userMap))
            console.log('同步数据',resu.length,"条")
            console.log("END-----------同步用户表结束", moment().format("YYYY-MM-DD"))

        })
    }
    @Cron("*/30 * * * *", false)
    public async WordCacheMethod() {
        const conn = await $PoolConn();
        const that = this;
        conn.query(that.wordSql, function (_, resu) {
            console.log('resu',resu);
            
            if (!resu.length) {
                return
            }
            delete that.wordMap;
            console.log("START-----------开始同步单词表", moment().format("YYYY-MM-DD"))
            const ret  = resu.map(item=>{
                item.user_name = that.userMap[item.user_id].username
                return item;
            })
            that.wordMap = lodash.keyBy(ret, "id")
            console.log('同步数据',JSON.stringify(that.wordMap))
            console.log('同步数据',resu.length,"条")
            console.log("END-----------同步单词表结束", moment().format("YYYY-MM-DD"))

        })
    }
}

export default new ScheduleServer();