// interface

export interface IArtist {
  name: string;
  image: string;
  nationality: string;
  songs: ISong[];
}

export interface ISong {
  title: string;
  artist: string;
  album: string;
  year: number;
  image: string;
}
