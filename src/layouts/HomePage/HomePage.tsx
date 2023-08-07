import "./homePage.css";
import React, {useReducer, useState} from "react";
import ParticipateButton from "./Components/ParticipateButton";
import {IFormVisible} from "../../types/app";
import RegisterSingerForm from "./Components/RegisterSingerForm";
import Confirmation from "./Components/Confirmation";
import UploadSong from "./Components/UploadSong";
import Loader from "../utils/Loader/Loader";
import Congratulation from "./Components/Congratulation";

export default function HomePage() {
    let [formElementsVisibility, setFormElementsVisibility] = useReducer(
        (prevState:IFormVisible, payload:IFormVisible) => ({...prevState, ...payload}),
        {
            participateButton: true,
            registerSingerForm: false,
            confirmation: false,
            uploadSong: false,
            congratulation: false
        }
    );
    let [singerId, setSingerId] = useState<string>("");
    let [code, setCode] = useState<string>("");

    const form = {
        formElementsVisibility: formElementsVisibility,
        updateVisibility: setFormElementsVisibility
    }

    return(
        <div className="main-content">
            {formElementsVisibility.participateButton && <ParticipateButton
                form={form}
            />}
            {formElementsVisibility.registerSingerForm && <RegisterSingerForm
                form={form}
                setSingerId={setSingerId}
            />}
            <Confirmation
                form={form}
                singerId={singerId}
                setCode={setCode}
            />
            {formElementsVisibility.uploadSong && <UploadSong
                form={form}
                singerId={singerId}
                code={code}
            />}
            {formElementsVisibility.congratulation && <Congratulation />}
        </div>
    )
}