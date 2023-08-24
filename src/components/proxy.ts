import {TarsusReflect} from "tarsus/core/microservice";

function ReflectProxy(proxy:string){
    return function (interFace){
        return TarsusReflect(proxy,interFace)
    }
}
const WordNodeProxy = ReflectProxy("WordNodeServer")

export {
    WordNodeProxy
}