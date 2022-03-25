import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IArtist[]>
) {
  res.status(200).json(data);
}

const data: IArtist[] = [
  {
    name: "John Mayer",
    image: "/images/john_mayer.jpg",
    nationality: "United State",
    songs: [
      {
        title: "Gravity",
        artist: "John Mayer",
        album: "Continuum",
        year: 2006,
        image: "/images/continuum.jpg",
      },
      {
        title: "Neon",
        artist: "John Mayer",
        album: "Continuum",
        year: 2006,
        image: "/images/continuum.jpg",
      },
      {
        title: "Last Train Home",
        artist: "John Mayer",
        album: "Sob Rock",
        year: 2021,
        image: "/images/sob_rock.jpg",
      },
    ],
  },
  {
    name: "John Splithoff",
    image: "/images/john_splithoff.jpg",
    nationality: "United State",
    songs: [
      {
        title: "Raye",
        artist: "John Splithoff",
        album: "Raye",
        year: 2018,
        image: "/images/raye.jpg",
      },
      {
        title: "Make It Happen",
        artist: "John Splithoff",
        album: "Make It Happen (Deluxe Edition)",
        year: 2018,
        image: "/images/make_it_happen.jpg",
      },
      {
        title: "Show Me",
        artist: "John Splithoff",
        album: "Make It Happen (Deluxe Edition)",
        year: 2018,
        image: "/images/make_it_happen.jpg",
      },
    ],
  },
];
