import Cookies from "js-cookie";
import PopupMenu from "../popup-menu/component.jsx";


const SettingsPopup = ({visible, onClose}) => {
    const updateUserAvatar = (file) => {
        try {
            const accessToken = Cookies.get('access_token');
            if (accessToken) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const base64Image = reader.result.split(',')[1];
                    // TODO rewrite -> await userAPI.uploadUserAvatar(accessToken, base64Image);
                    window.location.reload();
                };
                reader.readAsDataURL(file);
            }
        } catch (error) {
            console.error("Error uploading avatar:", error);
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            updateUserAvatar(file);
        } else {
            alert("Please upload a PNG or JPG image.");
        }
    }


    return (
        <PopupMenu
            visible={visible}
            title={`SETTINGS.exe`}
            onClose={onClose}
        >
        </PopupMenu>
    );
}

export default SettingsPopup;