import { useEffect, useState } from "react";
import UserService, { User } from "../services/user-service";
import { CanceledError } from "../services/api-client";
function useUser(){
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      const { request, cancel } = UserService.getAll<User>();
      request
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
      return () => cancel();
    }, []);
    return {users,error,isLoading,setError,setUsers}
}
export default useUser;