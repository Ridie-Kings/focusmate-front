import Navigation from "./NavBar/Navigation";
import LogoutButtons from "./NavBar/LogoutButtons";
import TopLogo from "./NavBar/TopLogo";

export default function NavBar({
  handleLogout,
}: {
  handleLogout: () => Promise<void>;
}) {
  return (
    <header
      className={`sticky top-0 left-0 h-screen bg-primary-500 flex flex-col py-6 transition-all duration-300 ease-in-out hover:w-60 hover:px-6 w-22 overflow-hidden z-50 group items-center text-secondary-100`}
    >
      <TopLogo />
      <Navigation />
      <LogoutButtons handleLogout={handleLogout} />
    </header>
  );
}
