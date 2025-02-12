const loadModules = async () => {
  const paths = ["auth/login", "auth/register"];

  const modules = await Promise.all(paths.map((path) => import(path)));

  const API: any = {
    auth: {
      login: modules[0].login,
      register: modules[1].register,
    },
  };

  return API;
};

export default await loadModules();
