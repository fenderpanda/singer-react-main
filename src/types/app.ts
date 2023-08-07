import React from "react";

export interface IFormVisible {
    participateButton: boolean;
    registerSingerForm: boolean;
    confirmation: boolean;
    uploadSong: boolean;
    congratulation: boolean;
}

export interface IFormVisibility {
    formElementsVisibility: IFormVisible;
    updateVisibility: React.Dispatch<React.SetStateAction<any>>;
}

export interface ISubError {
    field: string,
    message: string,
}