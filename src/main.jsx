import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import Cookies from "js-cookie";
import App from "./index.jsx";
import userAPI from "./global/scripts/user-api.js";


const accessToken = Cookies.get('access_token');
if (accessToken) {
    userAPI.authIsValid(accessToken)
        .then(token => {
            if (!token['is_valid']) {
                Cookies.remove('access_token');
            }
        })
        .catch(error => {
            console.error(error);
            Cookies.remove('access_token');
        });

}

createRoot(document.getElementById('root')).render(<StrictMode><App/></StrictMode>);
