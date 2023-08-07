import "./singer.css";
import {SingerDb} from "../../../../types/singer-db";
import Song from "../Song/Song";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "react-responsive";

export default function Singer({singer}: {singer: SingerDb}) {
    const {t} = useTranslation("common");

    const isDesktopOrLaptop = useMediaQuery({query: "(min-width: 1224px)"});
    const isTabletOrMobile = useMediaQuery({query: "(max-width: 1224px)"});

    let [show, setShow] = useState<boolean>(false);

    const humanPhoneNumber = (phone: string) => {
        return "(" + phone.slice(0, 3) + ") " + phone.slice(3, 6) + "-" + phone.slice(6, 10);
    }

    const toggleShow = () => {
        setShow(!show);
    }

    return(
        <div className="admin-border mb-3 p-2">
            {isDesktopOrLaptop && <div className="row m-0 admin-text">
                <div className="col-2">{singer.name}</div>
                <div className="col-5">{singer.email}</div>
                <div className="col-3">{humanPhoneNumber(singer.phone)}</div>
                <div className="col-2 singer">
                    {show ?
                        <div className="btn-toggle" onClick={toggleShow}>
                            {t("admin.song-toggle.hide")}
                        </div> :
                        <div className="btn-toggle" onClick={toggleShow}>
                            {t("admin.song-toggle.show")}
                        </div>
                    }
                </div>
            </div>}
            {isTabletOrMobile && <div className="d-flex flex-column m-0 admin-text">
                <div className="w-100">{singer.email}</div>
                <div className="row m-0">
                    <div className="col-3">{singer.name}</div>
                    <div className="col-6">{humanPhoneNumber(singer.phone)}</div>
                    <div className="col-3 singer">
                        {show ?
                            <i className="bi bi-caret-up neon" onClick={toggleShow}></i> :
                            <i className="bi bi-caret-down neon" onClick={toggleShow}></i>
                        }
                    </div>
                </div>
            </div>}
            <div className={`pt-2 ${show ? "" : "d-none"}`}>
                {singer.songs?.map((song) => (
                    <Song key={song.id} song={song}/>
                ))}
            </div>
        </div>
    )
}