import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="felx m-auto">
      <div className="flex gap-5 items-center">
        <span className="font-medium text-gray-900">Name :</span>
        <span className="text-gray-900">{user?.user?.name}</span>
      </div>
      <div className="flex gap-5 items-center mt-2">
        <span className="font-medium text-gray-900">Email :</span>
        <span className="text-gray-900">{user?.user?.email}</span>
      </div>
    </div>
  );
};

export default Profile;
