import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useOktaAuth} from "@okta/okta-react";

interface ILanguage {
    [key: string]: string
}

const language: ILanguage = {
    "en": "English",
    "ru": 'Русский',
}

const shortLang = {
    "en": "en",
    "ru": "ru",
}

const accessGroup = "MODERATORS";

export default function Header() {
    const {authState, oktaAuth} = useOktaAuth();
    const {i18n} = useTranslation("common");

    let [lang, setLang] = useState<string>(language.en)
    let [isModerator, setIsModerator] = useState<boolean>(false);
    let [moderatorEmail, setModeratorEmail] = useState<string>("");

    function hasAccess(groups: any):boolean {
        if (groups !== undefined) {
            return Object.values(groups).includes(accessGroup);
        }

        return false;
    }

    useEffect(() => {
        if (authState?.isAuthenticated) {
            const groups = authState.accessToken?.claims.groups;
            const email = authState.accessToken?.claims.sub;

            if (hasAccess(groups)) {
                setIsModerator(true);

                if (email !== undefined) {
                    setModeratorEmail(email);
                }
            }
        }
    }, [authState, oktaAuth])

    useEffect(() => {
        const i18nextLng = localStorage.getItem("i18nextLng");

        if (i18nextLng) {
            setLang(language[i18nextLng]);
        }
    })

    const handleSetLang = (event: any) => {
        const shortLang = event.target.value;
        const lang = language[shortLang];

        setLang(lang);
        i18n.changeLanguage(shortLang);

        localStorage.setItem("i18nextLng", shortLang);
    }

    return(
        <div className={`main-header container-fluid d-flex 
                        ${isModerator ? 
                            "justify-content-between admin-header-black" : 
                            "justify-content-end"}`}>
            {isModerator && <button
                type="button"
                className="btn btn-outline-light mt-1 mb-2"
                onClick={() => {
                    const postLogoutRedirectUrl = window.location.origin + process.env.PUBLIC_URL;
                    oktaAuth.signOut({postLogoutRedirectUri: postLogoutRedirectUrl})
                }}
            >
                Logout ({moderatorEmail})
            </button>}
            <div className="dropdown">
                <button className="btn btn-outline-light my-1 dropdown-toggle" type="button" id="dropdownMenu2"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    {lang}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    {Object.keys(shortLang).map((key, index) => (
                        <li key={index}>
                            <button className="dropdown-item" type="button" value={key}
                                    onClick={handleSetLang}
                            >{language[key]}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}