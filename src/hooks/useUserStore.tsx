import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  uuid?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  email?: string;
  sub?: string;
};

const initialUserState: UserState = {
  uuid: '',
  username: '',
  firstName: '',
  lastName: '',
  nickname:'',
  email: '',
  sub: ''
}

type UserActions = {
  setUser: (user: UserState) => void;
  reset: () => void;
};

const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      uuid: "",
      username: "",
      firstName: "",
      lastName: "",
      nickname: "",
      email: "",
      sub: "", 
      setUser: (user) => {
        set(user);
      },
      reset: () => {
        set(initialUserState);
      },
    }),
    {
      name: "user-data-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useUserStore;
