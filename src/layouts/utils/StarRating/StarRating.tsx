import React, {SetStateAction, useEffect, useRef, useState} from "react";
import './StarRating.css';
import EmptyStars from "./EmptyStars";
import FilledStars from "./FilledStars";
import AxiosOkta from "../../../security/AxiosOkta";

export default function StarRating({songId, rating, setRating}: {
    songId: number,
    rating: number,
    setRating: React.Dispatch<SetStateAction<number>>
}) {
    const ratingContainerRef = useRef<HTMLDivElement>(null);
    const baseVisibleRating = useRef<number>(rating * 2 * 10);

    let [newRating, setNewRating] = useState<number>(rating);
    let [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    let [visibleRating, setVisibleRating] = useState<number>(baseVisibleRating.current);

    useEffect(() => {
        if (!isConfirmed) {
            return;
        }

        baseVisibleRating.current = newRating * 2 * 10;

        const data = new FormData();
        data.append("rating", newRating.toString());

        AxiosOkta.put(`/api/songs/${songId}`, data)
            .then((p) => {
                console.log(p);
                setRating(newRating);
                setIsConfirmed(false);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [isConfirmed])

    const baseSize = 32;
    const size = {
        height: baseSize,
        width: baseSize * 5
    }
    const fill = "#F6FC6C";
    const stroke = "#F1FA1C";

    const handleClick = () => {
        setNewRating(visibleRating / 20);
        setIsConfirmed(true);
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        console.log(baseVisibleRating.current);
        if (ratingContainerRef.current !== null) {
            const {width, left} = ratingContainerRef.current.getBoundingClientRect();
            const percent = Math.round(((e.clientX - left) / width) * 100);
            const nearestTen = Math.ceil( percent / 10) * 10;

            setVisibleRating(nearestTen);
        }
    }

    const handleMouseLeave = () => {
        setVisibleRating(baseVisibleRating.current);
    }

    return(
        <div
            style={size}
            className='star-rating-main'
            ref={ratingContainerRef}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className='star-rating-child'>
                <EmptyStars size={size} fill={fill}/>
            </div>
            <div
                className='star-rating-child'
                style={{width: visibleRating + "%", overflow: "hidden"}}
            >
                <FilledStars size={size} fill={fill} stroke={stroke}/>
            </div>
        </div>
    )
};