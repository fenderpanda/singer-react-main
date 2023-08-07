import "./mobileRating.css";
import {Modal} from "react-bootstrap";
import React, {SetStateAction, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import AxiosOkta from "../../../security/AxiosOkta";

export default function MobileRating({songId, rating, setRating}: {
    songId: number,
    rating: number,
    setRating: React.Dispatch<SetStateAction<number>>
}) {
    const {t} = useTranslation("common");

    const rates = [
        "0.0", "0.5", "1.0", "1.5", "2.0", "2.5",
        "3.0", "3.5", "4.0", "4.5", "5.0",
    ];

    let [show, setShow] = useState<boolean>(false);
    let [newRating, setNewRating] = useState<number>(rating);
    let [isConfirmed, setIsConfirmed] = useState<boolean>(false);

    useEffect(() => {
        if (!isConfirmed) {
            return;
        }

        const data = new FormData();
        data.append("rating", newRating.toString());

        AxiosOkta.put(`/api/songs/${songId}`, data)
            .then((p) => {
                setIsConfirmed(false);
                setRating(newRating);
                setShow(false);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [isConfirmed])

    const handleRate = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleRateButton = (event: any) => {
        const rate: number = event.target.value;

        setNewRating(rate);
        setIsConfirmed(true);
    }

    return (
        <>
            <div className="me-3"
                 style={{fontSize: "1.6em", color: "#F540A0"}}
            >{Number(newRating).toFixed(1)}</div>
            <button type="button" className="btn btn-outline-light" onClick={handleRate}>
                {t("admin.rate-model.confirm")}
            </button>
            <Modal
                contentClassName="mobile-rating-container"
                centered={true}
                show={show}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="border-0">
                    <Modal.Title className="text-white">{t("admin.rate-model.title")}</Modal.Title>
                    <button type="button" className="btn btn-close btn-close-white" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <div className='d-flex flex-row flex-wrap py-1' style={{width: "432px"}}>
                            {rates.map((rate, index) => (
                                <button key={index}
                                        type="button"
                                        className={`btn btn-outline-light m-1 
                                    ${rate === newRating.toString() ? "active" : ""}`}
                                        style={{width: "100px", height: "100px", fontSize: "1.8em"}}
                                        onClick={handleRateButton}
                                        value={rate}
                                >{rate}</button>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}