import Tabs from "@/components/profile/Tabs";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <>
        <div>
            <Tabs />
        </div>
        <Outlet />
    </>
  )
}
