import "./song.css";
import {SongDb} from "../../../../types/singer-db";
import StarRating from "../../../utils/StarRating/StarRating";
import ReactAudioPlayer from "react-audio-player";
import {useMediaQuery} from "react-responsive";
import MobileRating from "../../../utils/MobileRating/MobileRating";
import {useState} from "react";

export default function Song({song}: {
    song: SongDb,
}) {
    const songFolder = process.env.REACT_APP_SONG_FOLDER;

    const isDesktopOrLaptop = useMediaQuery({query: "(min-width: 1224px)"});
    const isTabletOrMobile = useMediaQuery({query: "(max-width: 1224px)"});
    const isLandscape = useMediaQuery({query: "(orientation: landscape)"});
    const isPortrait = useMediaQuery({query: "(orientation: portrait)"});

    let [rating, setRating] = useState<number>(song.rating);

    return(
        <>
            {isDesktopOrLaptop && <div className="my-1 d-flex song-main">
                <div className="d-flex flex-row song-background py-3">
                    <div className="col-8 d-flex align-items-center px-3">
                        <ReactAudioPlayer
                            controls={true}
                            src={songFolder + song.uuidName}
                            style={{width: "100%"}}
                        />
                    </div>
                    <div className="col-4 d-flex align-items-center justify-content-center">
                        <StarRating songId={song.id} rating={rating} setRating={setRating}/>
                    </div>
                </div>
            </div>}
            {isTabletOrMobile && isPortrait && <div className="my-1 d-flex song-main">
                <div className="d-flex flex-column song-background py-3">
                    <div className="d-flex align-items-center px-3">
                        <ReactAudioPlayer
                            controls={true}
                            src={songFolder + song.uuidName}
                            style={{width: "100%"}}
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-end pe-4 mt-2">
                        <MobileRating songId={song.id} rating={rating} setRating={setRating}/>
                    </div>
                </div>
            </div>}
            {isTabletOrMobile && isLandscape && <div className="my-1 d-flex song-main">
                <div className="d-flex flex-row song-background py-3">
                    <div className="d-flex col-9 align-items-center px-3">
                        <ReactAudioPlayer
                            controls={true}
                            src={songFolder + song.uuidName}
                            style={{width: "100%"}}
                        />
                    </div>
                    <div className="d-flex col-3 align-items-center justify-content-center">
                        <MobileRating songId={song.id} rating={rating} setRating={setRating}/>
                    </div>
                </div>
            </div>}
        </>
    )
}