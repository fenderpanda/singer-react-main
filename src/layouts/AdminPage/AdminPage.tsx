import "./adminPage.css";
import {SingerDb} from "../../types/singer-db";
import {useEffect, useState} from "react";
import Singer from "./Components/Singer/Singer";
import {useOktaAuth} from "@okta/okta-react";
import Loader from "../utils/Loader/Loader";
import {toRelativeUrl} from "@okta/okta-auth-js";
import AxiosOkta from "../../security/AxiosOkta";

export default function AdminPage() {
    const {authState, oktaAuth} = useOktaAuth();

    let [singers, setSingers] = useState<SingerDb[] | null>(null);
    let [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!authState) {
            return;
        }

        if (!authState?.isAuthenticated) {
            const originalUri = toRelativeUrl(window.location.href,
                window.location.origin + process.env.PUBLIC_URL);
            oktaAuth.setOriginalUri(originalUri);
            oktaAuth.signInWithRedirect();
        }

        if (authState && authState.isAuthenticated) {
            AxiosOkta.get('/api/singers', )
                .then((response) => {
                    setSingers(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log(error);
                    }
                })
        }
    },[authState, oktaAuth])

    return(
        <div className="mt-5">
            <Loader active={isLoading} blackScreen={true} />
            <div className="container-fluid py-1 d-flex flex-column admin-max-width">
                {singers?.map((singer) => (
                    <Singer key={singer.id} singer={singer} />
                ))}
            </div>
        </div>

    )
}