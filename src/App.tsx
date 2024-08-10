import UserService, { User } from "./services/user-service";
import useUser from "./hooks/useUsers";

const App = () => {
  const { users, error, isLoading, setError, setUsers } = useUser();
  const userDelete = (u: User) => {
    const originalUser = [...users];
    setUsers(users.filter((user) => user.id !== u.id));
    UserService.Delete(u.id).catch((err) => {
      setError(err.message);
      setUsers(originalUser);
    });
  };
  const userUpdate = (user: User) => {
    const originalUser = [...users];
    const UpdatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? UpdatedUser : u)));
    UserService.Update(UpdatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUser);
    });
  };
  const addUser = () => {
    const originalUser = [...users];
    const newUser = {
      id: 0,
      name: "bishal",
    };
    setUsers([newUser, ...users]);

    UserService.Add(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUser);
      });
  };
  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="d-flex justify-content-between list-group-item"
          >
            {user.name}
            <div>
              {" "}
              <button
                className="btn btn-primary"
                onClick={() => userUpdate(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => userDelete(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
