import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {IFormVisibility} from "../../../types/app";
import Axios from "../../../security/Axios";
import {useTranslation} from "react-i18next";

export default function Confirmation({form, singerId, setCode}: {
    form: IFormVisibility,
    singerId: string,
    setCode: React.Dispatch<React.SetStateAction<string>>
}) {
    const {t} = useTranslation("common");

    let [verificationError, setVerificationError] = useState<string>("");
    let [confirmationCode, setConfirmationCode] = useState<string>("");
    let [show, setShow] = useState(false);

    useEffect(() => {
        if (form.formElementsVisibility.confirmation) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [form.formElementsVisibility.confirmation])
    
    const handleClose = () => {
        setVerificationError("");

        form.formElementsVisibility.confirmation = false;
        form.updateVisibility(form.formElementsVisibility);
    }

    const handleConfirm = () => {
        Axios.get("/api/verify", {
            params: {
                "singerId" : singerId,
                "code": confirmationCode
            }
        })
            .then(() => {
                setCode(confirmationCode);

                form.formElementsVisibility.registerSingerForm = false;
                form.formElementsVisibility.confirmation = false;
                form.formElementsVisibility.uploadSong = true;
                form.updateVisibility(form.formElementsVisibility);
            })
            .catch((error) => {
                if (error.response) {
                    setVerificationError(error.response.data);
                }
            });
    }

    const handleCodeChange = (event: any) => {
        setConfirmationCode(event.target.value);
        setVerificationError("");
    }

    return(
        <Modal
            dialogClassName='dialog-main'
            contentClassName='ff-register-form-container'
            centered={true}
            show={show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className="border-0">
                <Modal.Title className="text-white">{t("verification.title")}</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex flex-column my-auto py-1'>
                    <input type="text" name="code" className={
                        verificationError ?
                        "form-control error ff-register-input" :
                        "form-control ff-register-input"
                    }
                           placeholder={t("verification.placeholder")}
                           onChange={handleCodeChange}
                    />
                    <div className="d-flex justify-content-center">
                        <div className="d-inline-block text-center ff-error-text-color">
                            {verificationError}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button className="btn btn-outline-light" onClick={handleConfirm}>
                    {t("verification.confirm")}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}