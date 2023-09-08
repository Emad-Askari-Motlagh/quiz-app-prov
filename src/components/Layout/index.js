import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../Header";
import "./Layout.scss";
import { useEffect } from "react";
export default function PrimaryLayout({ user }) {
  //persist product filters and user on server side renders
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="container">
      <Header user={user} />
      <Outlet />
      <Footer />
    </div>
  );
}
