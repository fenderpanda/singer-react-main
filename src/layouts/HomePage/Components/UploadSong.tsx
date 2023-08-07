import React, {useEffect, useState} from "react";
import {IFormVisibility, ISubError} from "../../../types/app";
import Axios from "../../../security/Axios";
import {useTranslation} from "react-i18next";
import Loader from "../../utils/Loader/Loader";

export default function UploadSong({form, singerId, code}: {
    form: IFormVisibility,
    singerId: string,
    code: string
}) {
    const {t} = useTranslation("common");

    let [songErrors, setSongErrors] = useState<[ISubError] | null>(null);

    let [isLoading, setIsLoading] = useState<boolean>(false);
    let [progress, setProgress] = useState<number>(0);
    let [song, setSong] = useState(null);

    useEffect(() => {
        if (progress === 100) {
            setIsLoading(true);
        }
    }, [progress])

    const handleFileUpload = (event: any) => {
        setSongErrors(null);

        const file = event.target.files[0];
        let label = event.target.labels[0].childNodes[0];

        if (file !== null) {
            label.data = file.name;
            setSong(file);
        }
    }

    function handleUploadProgress(progress: number): string {
        if (progress === 0) {
            return "";
        }

        if (progress === 100) {
            return "Processing...";
        }

        return progress + "%";
    }

    const handleClick = () => {
        if (!song)
            return;

        const data = new FormData();
        data.append("singerId", singerId);
        data.append("code", code);
        data.append("song", song);

        Axios.post("/api/songs", data, {
                onUploadProgress: (progressEvent: any) => {
                    setProgress(Math.round(progressEvent.loaded / progressEvent.total * 100));
                }
            })
            .then((response) => {
                setIsLoading(false);

                form.formElementsVisibility.uploadSong = false;
                form.formElementsVisibility.congratulation = true;
                form.updateVisibility(form.formElementsVisibility);
            })
            .catch((error) => {
                setIsLoading(false);

                if (error.response) {
                    setProgress(0);
                    const responseData = error.response.data;

                    if (responseData.subErrors !== undefined) {
                        setSongErrors(responseData.subErrors);
                    }
                }
            });
    }

    return(
        <>
            {isLoading && <Loader active={true} blackScreen={false} />}
            <div className="container-fluid d-flex flex-column h-100 justify-content-center align-items-center">
                <div className='container d-flex flex-column max-width-600 mb-3 opacity-75 ff-register-form-container'>
                    <div className='row'>
                        <div className='d-flex justify-content-center align-items-center
                                    ff-field-two ff-top-left-radius ff-bottom-left-radius col-2'>
                            {t("songUpload.field")}
                        </div>
                        <div className='d-flex flex-column my-auto col-10 py-1'>
                            <label className='form-control ff-register-input position-relative'
                                   htmlFor="customFile"
                            >{t("songUpload.placeholder")}
                                <div className="position-absolute top-0 start-0 h-100"
                                     style={{width: progress + "%", background: "blue"}}></div>
                                <div className="position-absolute top-0 start-0 h-100 w-100
                                            d-flex justify-content-center align-items-center">
                                    {handleUploadProgress(progress)}
                                </div>
                            </label>
                            <input type='file'
                                   id="customFile"
                                   style={{visibility: "hidden", width: 0, height: 0}}
                                   onChange={handleFileUpload}
                            />
                            {songErrors?.map((error, i) => {
                                return <div key={i} className="d-flex justify-content-center">
                                    <div className="d-inline-block text-center ff-error-text-color">
                                        {error.message}
                                    </div>
                                </div>;
                            })}
                        </div>
                    </div>
                </div>
                <div className='d-inline-block px-3 mt-2 participate-button'
                     onClick={handleClick}
                >
                    {t("songUpload.confirm")}
                </div>
            </div>
        </>
    )
}