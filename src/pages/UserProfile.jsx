import { useParams } from "react-router";
import EditProfileModal from '../components/userProfile/EditProfileModal';
import FavoriteProductCard from '../components/userProfile/FavoriteProductCard';
import ProfileCard from '../components/userProfile/ProfileCard';

const UserProfile = () => {
    const { userId } = useParams();

    return (
        <>
            <ProfileCard userId={userId} />
            <EditProfileModal userId={userId} />
            <FavoriteProductCard userId={userId} />
        </>
    );
};

export default UserProfile;
