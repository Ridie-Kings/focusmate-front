import { create } from "zustand";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { getMyProfile } from "@/services/Profile/getMyProfile";
import { updateProfile } from "@/services/Profile/UpdateProfile";
import { UpdateUser } from "@/services/User/UpdateUser";
import { UserType } from "@/interfaces/User/UserType";

type ProfileActions = {
  clearProfile: () => void;

  setLoading: (loading: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  updateProfile: (
    profile: Partial<ProfileType>
  ) => Promise<{ message: string; success: boolean }>;
  updateUser: (
    user: Partial<UserType>
  ) => Promise<{ message: string; success: boolean }>;
};

interface ProfileStore {
  profile: ProfileType | null;
  loading: boolean;
  isAuthenticated: boolean;
  initProfile: () => Promise<void>;
  actions: ProfileActions;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,

  loading: true,

  isAuthenticated: false,

  initProfile: async () => {
    const { profile } = get();

    if (!profile) {
      set({ loading: true });
      try {
        const { success, res } = await getMyProfile();
        if (success && res) {
          set({ profile: res, isAuthenticated: true });
        }
      } finally {
        set({ loading: false });
      }
    }
  },

  actions: {
    clearProfile: () => set({ profile: null, isAuthenticated: false }),

    setLoading: (loading) => set({ loading: loading }),

    updateProfile: async (profile) => {
      try {
        const { success, res } = await updateProfile({
          id: get().profile?._id ?? "",
          profile: { ...profile },
        });

        if (success && res) {
          set({ profile: res });
        } else {
          return {
            message: typeof res === "string" ? res : "Error updating profile",
            success: false,
          };
        }
      } catch (error) {
        return { message: error as string, success: false };
      }
      return { message: "Profile updated successfully", success: true };
    },

    updateUser: async (user) => {
      try {
        const { success, res } = await UpdateUser({
          id: get().profile?.user._id ?? "",
          user: user,
        });

        if (success && res)
          set({
            profile: {
              ...get().profile,
              user: {
                ...get().profile?.user,
                ...user,
              } as UserType,
            } as ProfileType,
          });
        else return { message: res, success: false };
      } catch (error) {
        return { message: error, success: false };
      }
      return { message: "User updated successfully", success: true };
    },

    setIsAuthenticated: (isAuthenticated) =>
      set({ isAuthenticated: isAuthenticated }),
  },
}));

export const useProfile = () => useProfileStore((state) => state.profile);

export const useInitProfile = () =>
  useProfileStore((state) => state.initProfile);

export const useLoading = () => useProfileStore((state) => state.loading);
