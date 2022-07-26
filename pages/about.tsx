import styled from "styled-components";
import { NextPage, GetServerSideProps } from "next";
import axios from "axios";
import Image from "next/image";
import Seo from "components/seo";

interface IAboutProps {
  artistInfo: IArtist[];
}

const About: NextPage<IAboutProps> = ({ artistInfo }) => {
  return (
    <Wrapper>
      <Seo title="Next app - about" />
      {artistInfo.map((artist) => (
        <Container key={artist.name}>
          <ImageContainer width="100%" height="400px" borderRadius="3rem">
            <Image
              src={artist.image}
              alt="artist image"
              layout="fill"
              objectFit="cover"
              priority
            />
          </ImageContainer>
          <h3 className="name">{artist.name}</h3>
          <span className="nationality">{artist.nationality}</span>
          <Songlist>
            {artist.songs.map((song) => (
              <li key={song.title}>
                <ImageContainer height="100px" width="100px" borderRadius="50%">
                  <Image
                    src={song.image}
                    alt="artist image"
                    layout="fill"
                    objectFit="cover"
                  />
                </ImageContainer>
                <div className="info_box">
                  <h4 className="title">{song.title}</h4>
                  <span className="artist">
                    {song.artist} / {song.year}
                  </span>
                  <span className="album">{song.album}</span>
                </div>
              </li>
            ))}
          </Songlist>
        </Container>
      ))}
    </Wrapper>
  );
};

export default About;

export const getServerSideProps: GetServerSideProps = async () => {
  const artistInfo: IArtist[] = [
    {
      name: "John Mayerrrr",
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

  return {
    props: {
      artistInfo,
    },
  };
};

const Wrapper = styled.section`
  width: 960px;
  margin: 0 auto;
  padding: 50px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;

const Container = styled.article`
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.primary_color};
  border-radius: 2rem;
  .name,
  .nationality {
    text-align: center;
  }
  .name {
    font-size: 3rem;
    margin-top: 20px;
  }
  .nationality {
    font-size: 2rem;
    display: block;
  }
`;

const ImageContainer = styled.div<{
  width: string;
  height: string;
  borderRadius?: string;
}>`
  position: relative;
  overflow: hidden;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "0")};
`;

const Songlist = styled.ul`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  li {
    display: flex;
    gap: 30px;
    .title {
      font-size: 1.7rem;
    }
    .artist,
    .album {
      display: block;
      font-size: 1.2rem;
    }
  }
`;
