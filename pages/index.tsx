// React & Next
import { NextPage, GetStaticProps, GetServerSideProps } from "next";
import Image from "next/image";
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { queryKeys } from "utils/queryKeys";
// Style
import styled from "styled-components";
// Utils
import { getMovieName, getNameData } from "utils/api";

const Home: NextPage = () => {
  // CSR
  const { isLoading, data: nameData } = useQuery<{ name: string }>(
    queryKeys.NAME,
    getNameData
  );

  // SSG
  const { data: movieData } = useQuery(queryKeys.MOVIE, getMovieName);

  console.log("loading", !isLoading, nameData);

  return (
    <>
      <TextSection>
        <div className="text_container">
          <h2 className="title">Next js Template</h2>
          {nameData && <h3 className="author">by crs {nameData.name}</h3>}
          <h3 className="author">by SSG {movieData.original_title}</h3>
        </div>
      </TextSection>
      <ImageSection>
        <div className="img_container">
          <Image
            src="/images/sample.jpg"
            alt="sample"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </ImageSection>
      <TextSection>
        <div className="text_container">
          <p className="desc">
            Sed ut perspiciatis unde omnis iste nnpmx atus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>
      </TextSection>
      <ImageSection>
        <div className="img_container">
          <Image
            src="/images/sample2.jpg"
            alt="sample"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </ImageSection>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["movie"], getMovieName);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const TextSection = styled.section`
  width: 100%;
  min-height: 400px;
  ${({ theme }) => theme.mixin.flexCenter}
  padding: 50px 0;
  .text_container {
    .title,
    .author,
    .desc {
      text-align: center;
    }
    .title {
      font-size: 60px;
      color: ${({ theme }) => theme.colors.primary_color};
    }
    .author {
      font-size: 40px;
    }
    .desc {
      font-size: 2rem;
      word-break: keep-all;
      width: 960px;
      margin: 0 auto;
    }
  }
`;

const ImageSection = styled.section`
  width: 100%;
  .img_container {
    width: 100%;
    height: 600px;
    position: relative;
  }
`;
