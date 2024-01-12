import { useState, useMemo, createContext, useContext } from "react";

export async function getServerSideProps() {
  const resp = await fetch("/api/user/fetchAllUser");
  console.log(resp.json());
  return {
    props: {
      users: await resp.json(),
    },
  };
}

const useUsersController = (users: any) => {
  const [filter, setFilter] = useState("");

  const filteredUsers = useMemo(
    () =>
      users?.filter((user: any) =>
        user.name.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter, users],
  );

  return {
    filter,
    setFilter,
    users: filteredUsers,
  };
};

const UserContext = createContext<ReturnType<typeof useUsersController>>({
  filter: "",
  setFilter: () => {},
  users: [],
});

export const UsersProvider = ({ users, children }: any) => (
  <UserContext.Provider value={useUsersController(users)}>
    {children}
  </UserContext.Provider>
);

export const useUserContext = () => useContext(UserContext);
