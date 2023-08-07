import {IFormVisibility} from "../../../types/app";
import {useTranslation} from "react-i18next";

export default function ParticipateButton({form}: {
    form: IFormVisibility
}) {
    const {t} = useTranslation("common");

    const handleClick = () => {
        form.formElementsVisibility.participateButton = false;
        form.formElementsVisibility.registerSingerForm = true;
        form.updateVisibility(form.formElementsVisibility);
    }

    return (
        <div className='container h-100 d-flex justify-content-center align-items-center'>
            <div className='d-inline-block px-3 participate-button'
                 onClick={handleClick}
            >
                {t("participate")}
            </div>
        </div>
    )
}