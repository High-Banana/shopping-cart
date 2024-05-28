import { Link } from "react-router-dom";
import Profile from "./MyAccount";
import { useUserContext } from "../../context/UserContext";

export default function ProfilePage() {
  const { userDetails } = useUserContext();
  return (
    <div className="min-h-[800px] grid grid-cols-[0.5fr_2fr] gap-10">
      <div className="border-r border-black">
        <ul>
          <Link to="profile">My Profile</Link>
          {userDetails.isAdmin === 1 && <Link to="stock">Stock</Link>}
        </ul>
      </div>
      <Profile />
    </div>
  );
}
