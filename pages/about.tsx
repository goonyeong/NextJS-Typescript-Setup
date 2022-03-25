import styled from "styled-components";
import { GetServerSideProps } from "next";
import axios from "axios";
import Image from "next/image";
import Seo from "../components/seo";

interface IAboutProps {
  data: IArtist[];
}

const About = ({ data }: IAboutProps) => {
  return (
    <Wrapper>
      <Seo title="Next app - about" />
      {data.map((artist) => (
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
  const { data } = await axios({
    method: "get",
    url: "http://localhost:3000/api/about",
  });

  return {
    props: {
      data,
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
