
import apiClient from "./api-client";
interface Entity{
    id:number;
}
class HttpService{
    endpoint:string;
    constructor(endpoint:string){
        this.endpoint=endpoint;
    }
    getAll<T>(){
        const controllers = new AbortController();
    const request  = apiClient
      .get<T[]>(this.endpoint, {
        signal: controllers.signal,
      })
      return {request,cancel:()=>controllers.abort()}
    }
    Delete<T >(id:number){
       return apiClient.delete(this.endpoint+'/' + id)
    }
    Update<T extends Entity>(entity:T){
        return apiClient.patch(this.endpoint+'/' + entity.id, entity)
    }
    Add<T>(entity:T){
        return apiClient
      .post(this.endpoint, entity)
    }
}
const create = (endpoint:string)=>{
    return new HttpService(endpoint)
}
export default create;