import "./loader.css";
import React, {useEffect, useState} from "react";

export default function Loader({active, blackScreen} : {
    active: boolean,
    blackScreen: boolean
}) {
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(active);
    },[active])

    return(
        <div className={loading ? '' : 'loaded'}>
            <div id="loader-wrapper">
                <div id="loader"></div>
                {blackScreen && <div className="loader-section section-left"></div>}
                {blackScreen && <div className="loader-section section-right"></div>}
            </div>
        </div>
    )
}