import styled from "styled-components";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getMovieDetail, TMBD_IMAGE_URL } from "apis/api";
import { QUERY_KEYS } from "utils/queries/queryKeys";
import { useFetchMovieDetail } from "utils/queries/queries";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: { id?: string } = context.query;

  const queryClient = new QueryClient();
  if (id) {
    await queryClient.prefetchQuery(QUERY_KEYS.MOVIE_DETAIL, () =>
      getMovieDetail(parseInt(String(id)))
    );
  }

  return { props: { dehydratedState: dehydrate(queryClient), id: parseInt(String(id)) } };
};

const Detail = ({ id }: { id: number }) => {
  const { data: movieData } = useFetchMovieDetail(id);

  return (
    <Wrapper>
      {movieData && (
        <Container>
          <ImageContainer width="100%" height="400px" borderRadius="3rem">
            <Image
              src={`${TMBD_IMAGE_URL}${movieData.poster_path}`}
              alt="artist image"
              layout="fill"
              objectFit="cover"
              priority
            />
          </ImageContainer>
          <>
            <h3 className="name" onClick={() => {}}>
              {movieData.original_title}
            </h3>
          </>
        </Container>
      )}
    </Wrapper>
  );
};

export default Detail;

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
