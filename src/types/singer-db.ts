export interface SingerDb {
    id: number;
    name: string;
    email: string;
    phone: string;
    songs: [SongDb];
    verificationCode: CodeDb;
    updatedAt: string;
    createdAt: string;
}

export interface CodeDb {
    id: number;
    code: string;
    createdAt: string;
}

export interface SongDb {
    id: number;
    originalName: string;
    uuidName: string;
    rating: number;
    updatedAt: string;
    createdAt: string;
}