import React, {useEffect, useState} from "react";
import {IFormVisibility, ISubError} from "../../../types/app";
import Axios from "../../../security/Axios";
import {useTranslation} from "react-i18next";
import {Modal} from "react-bootstrap";
import Loader from "../../utils/Loader/Loader";

export default function RegisterSingerForm({form, setSingerId}: {
    form: IFormVisibility,
    setSingerId: React.Dispatch<React.SetStateAction<string>>
}) {
    const {t} = useTranslation("common");

    let [isParticipated, setIsParticipated] = useState<boolean>(false);
    let [isLoading, setIsLoading] = useState<boolean>(false);

    let [errors, setErrors] = useState<[ISubError] | null>(null);
    let [participatedError, setParticipatedError] = useState<string>("");

    let [email, setEmail] = useState<string>("");
    let [phone, setPhone] = useState<string>("");
    let [name, setName] = useState<string>("");

    let [emailError, setEmailError] = useState<string>("");
    let [phoneError, setPhoneError] = useState<string>("");
    let [nameError, setNameError] = useState<string>("");

    useEffect(() => {
        if (errors !== null) {
            errors.forEach((subError: ISubError) => {
                switch (subError.field) {
                    case "email":
                        if (emailError === "")
                            setEmailError(subError.message);
                        break;
                    case "phone":
                        if (phoneError === "")
                            setPhoneError(subError.message);
                        break;
                    case "name":
                        if (nameError === "")
                            setNameError(subError.message);
                        break;
                }
            })
        }
    }, [errors])

    const handleClose = () => {
        setIsParticipated(false);
    }

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
        setEmailError("");
    }

    const handleNameChange = (event: any) => {
        setName(event.target.value);
        setNameError("");
    }

    const handlePhoneChange = (event: any) => {
        setPhone(event.target.value);
        setPhoneError("");
    }

    const handleClick = () => {
        setIsLoading(true);

        let data = new FormData();
        data.append("email", email.trim());
        data.append("name", name.trim());
        data.append("phone", phone.trim());

        Axios.post("/api/register", data)
            .then((response) => {
                setIsLoading(false);
                setSingerId(response.data);

                form.formElementsVisibility.confirmation = true;
                form.updateVisibility(form.formElementsVisibility);
            })
            .catch((error) => {
                setIsLoading(false);

                if (error.response) {
                    const responseData = error.response.data;

                    if (responseData.subErrors === undefined) {
                        setParticipatedError(responseData);
                        setIsParticipated(true);
                    } else {
                        setErrors(error.response.data.subErrors);
                    }
                }
            });
    }

    return(
        <>
            {isLoading && <Loader active={true} blackScreen={false}/>}
            <div className="container-fluid d-flex flex-column h-100 justify-content-center align-items-center">
                <div className='container my-3 d-flex flex-column max-width-600 ff-opacity ff-register-form-container'>
                    <div className='row'>
                        <div className='d-flex justify-content-center align-items-center
                                    ff-field-one ff-top-left-radius col-3'>
                            {t("registration.field.email")}
                        </div>
                        <div className='d-flex flex-column my-auto col-9 py-2'>
                            <input type="text" name="email" className={
                                emailError ?
                                    "form-control error ff-register-input" :
                                    "form-control ff-register-input"
                            }
                                   placeholder={t("registration.placeholder.email")}
                                   onChange={handleEmailChange}
                            />
                            <div className="d-flex justify-content-center">
                                <div className="d-inline-block text-center ff-error-text-color">
                                    {emailError}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='d-flex justify-content-center align-items-center
                                    ff-field-two col-3'>
                            {t("registration.field.phone")}
                        </div>
                        <div className='d-flex flex-column my-auto col-9 py-2'>
                            <input type="text" name="phone" className={
                                phoneError ?
                                    "form-control error ff-register-input" :
                                    "form-control ff-register-input"
                            }
                                   placeholder={t("registration.placeholder.phone")}
                                   onChange={handlePhoneChange}
                            />
                            <div className="d-flex justify-content-center">
                                <div className="d-inline-block text-center ff-error-text-color">
                                    {phoneError}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='d-flex justify-content-center align-items-center
                                    ff-field-one ff-bottom-left-radius col-3'>
                            {t("registration.field.name")}
                        </div>
                        <div className='d-flex flex-column my-auto col-9 py-2'>
                            <input type="text" name="name" className={
                                nameError ?
                                    "form-control error ff-register-input" :
                                    "form-control ff-register-input"
                            }
                                   placeholder={t("registration.placeholder.name")}
                                   onChange={handleNameChange}
                            />
                            <div className="d-flex justify-content-center">
                                <div className="d-inline-block text-center ff-error-text-color">
                                    {nameError}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-inline-block px-3 mt-2 participate-button'
                     onClick={handleClick}
                >
                    {t("next")}
                </div>
                <Modal
                    dialogClassName='dialog-main'
                    contentClassName='ff-register-form-container'
                    centered={true}
                    show={isParticipated}
                    backdrop="static"
                    keyboard={false}
                >

                    <Modal.Body>
                        <div className="text-white text-center pt-4 h1 position-relative">
                            {participatedError}
                            <button className="btn btn-close position-absolute end-0 top-0"
                                    onClick={handleClose}></button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}