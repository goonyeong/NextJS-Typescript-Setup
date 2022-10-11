// React & Next
import { NextPage, GetServerSideProps } from "next";
import Image from "next/image";
// Style
import styled from "styled-components";
// Components
import Seo from "components/seo";
// Api
import { getArtistData, getNameData } from "apis/api";
import { dehydrate, DehydratedState, QueryClient, useQuery } from "@tanstack/react-query";

const About: NextPage = () => {
  // SSR
  const { data: artistData } = useQuery<IArtist[]>(["artist"], getArtistData);

  return (
    <Wrapper>
      <Seo title="Next app - about" />
      {artistData &&
        artistData.map((artist) => (
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
                      priority
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

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["artist"], getArtistData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
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
