import "./errorPage.css";
import {useTranslation} from "react-i18next";

export default function ErrorPage() {
    const {t} = useTranslation("common");

    return(
        <div className="main-content d-flex justify-content-center align-items-center">
            <div className="main-error px-3">
                {t("error.bad-gateway.first")}<br/>
                {t("error.bad-gateway.second")}
            </div>
        </div>
    )
}