import styled from "styled-components";
import Image from "next/image";
import { GetServerSideProps, GetStaticProps } from "next";
import { dehydrate, DehydratedState, QueryClient, useQuery } from "@tanstack/react-query";
import { getMovieDetail, TMBD_API_URL } from "utils/api";
import { queryKeys } from "types/queryKeys";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: { id?: string } = context.query;

  const queryClient = new QueryClient();
  if (id) {
    await queryClient.prefetchQuery(queryKeys.DETAIL, () => getMovieDetail(parseInt(id)));
  }

  return { props: { dehydratedState: dehydrate(queryClient), id: id } };
};

const Detail = ({ id }: { id: string }) => {
  const { data: movieData, isLoading } = useQuery(queryKeys.DETAIL, () =>
    getMovieDetail(parseInt(id))
  );

  console.log(movieData);
  console.log(id);

  return (
    <Wrapper>
      {!isLoading && (
        <Container>
          <ImageContainer width="100%" height="400px" borderRadius="3rem">
            <Image
              src={`${TMBD_API_URL}${movieData.poster_path}`}
              alt="artist image"
              layout="fill"
              objectFit="cover"
              priority
            />
          </ImageContainer>
          <>
            <h3 className="name">{movieData.original_title}</h3>
            <span className="nationality">{movieData.original_title}</span>
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
