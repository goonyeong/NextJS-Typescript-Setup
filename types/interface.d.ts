// interface
interface IUserInfo {
  name: string;
}

interface IArtist {
  name: string;
  image: string;
  nationality: string;
  songs: ISong[];
}

interface ISong {
  title: string;
  artist: string;
  album: string;
  year: number;
  image: string;
}

interface IMovieDetail {
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
}
