import styled from "styled-components";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getMovieDetail, TMBD_IMAGE_URL } from "apis/api";
import { QUERY_KEYS } from "queries/queryKeys";
import { useFetchMovieDetail, usePostMovieRate } from "queries/queries";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: { id?: string } = context.query;

  const queryClient = new QueryClient();
  if (id) {
    await queryClient.prefetchQuery(QUERY_KEYS.MOVIE_DETAIL, () => getMovieDetail(parseInt(id)));
  }

  return { props: { dehydratedState: dehydrate(queryClient), id: id } };
};

const Detail = ({ id }: { id: string }) => {
  const { data: movieData } = useFetchMovieDetail(parseInt(id));
  const { mutate, isError, isLoading } = usePostMovieRate();

  console.log("data", movieData);

  const handleNameClick = async () => {
    console.log("clicked!");

    const result = mutate({
      movie_id: parseInt(id),
      score: 3.5,
    });

    console.log(result);
  };

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
            <h3 className="name" onClick={handleNameClick}>
              {movieData.original_title}
            </h3>
            <span className="nationality">
              {isError ? "post Error" : isLoading ? "loading" : "nothing"}
            </span>
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
