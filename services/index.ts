const loadModules = async () => {
  const paths = [
    "Auth/login",
    "Auth/register",
    "Profile/getMyProfile",
    "Profile/getProfile",
  ];

  const modules = await Promise.all(paths.map((path) => import(path)));

  const API: any = {
    auth: {
      login: modules[0].login,
      register: modules[1].register,
    },
    profile: {
      getMyProfile: modules[0].getMyProfile,
      getProfile: modules[0].getProfile,
    },
  };

  return API;
};

export default await loadModules();
