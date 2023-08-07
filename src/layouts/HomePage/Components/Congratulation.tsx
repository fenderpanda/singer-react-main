import {useTranslation} from "react-i18next";

export default function Congratulation() {
    const {t} = useTranslation("common");

    return(
        <div className="container h-100 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column px-3 py-2 congratulation">
                <div className="d-inline-block mb-2">
                    {t("congratulation.title")}
                </div>
                <div className="d-inline-block">
                    {t("congratulation.main-text")}
                </div>
            </div>
        </div>
    )
}