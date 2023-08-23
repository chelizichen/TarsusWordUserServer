import {LoadInterface, LoadTaro, LoadStruct, LoadServer, TarsusMsApplication} from 'tarsus/core/microservice';
import WordImpl from './interface/Word';
import RecordImpl from "./interface/Record";
import UserImpl from "./interface/UserInf";
import PlanImpl from "./interface/PlanInf";
import "./components/cache";


@TarsusMsApplication
class MicroService {
    static main() {
        LoadInterface([WordImpl, RecordImpl, UserImpl, PlanImpl]);
        LoadTaro()
        LoadStruct()
        LoadServer();
    }
}

MicroService.main()