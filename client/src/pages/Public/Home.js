import { Header, SideBar } from ".";
import { Outlet, useLocation } from "react-router-dom";
import { Search } from "./index";
import { Contact, Intro, Footer } from "../../components";
import { DETAIL } from "../../constants/path";
const Home = () => {
  const location = useLocation();
  return (
    <>
      <div className="w-full flex flex-col items-center h-full border-red-500">
        <Header />
        <SideBar />
        {!(
          location.pathname === "/dang-nhap-tai-khoan" ||
          location.pathname === "/dang-ky-tai-khoan" ||
          location.pathname === "/lien-he" ||
          location.pathname.includes(`${DETAIL}`) ||
          location.pathname === "/tin-dang-da-luu" ||
          location.pathname === "/block"
        ) && <Search />}
        <div className="w-11/12 lg:w-3/4 flex flex-col justify-start">
          <Outlet />
        </div>
        <Intro />
        <Contact />
        <Footer />
      </div>
    </>
  );
};
export default Home;
