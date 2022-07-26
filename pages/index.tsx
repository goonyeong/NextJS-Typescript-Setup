import { NextPage, GetStaticProps } from "next";
import Image from "next/image";
// import Head from
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

interface IHomeprops {
  data: any;
}

const Home: NextPage<IHomeprops> = ({ data }) => {
  const [csrData, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      const {
        data: { name },
      } = await axios({
        method: "get",
        url: "http://localhost:3000/api/name",
      });

      setData(name);
    };

    getData();
  }, []);

  console.log(data);

  return (
    <>
      <TextSection>
        <div className="text_container">
          <h2 className="title">Next js Template</h2>
          <h3 className="author">by crs {csrData}</h3>
          <h3 className="author">by SSG {data.title}</h3>
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

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios({
    method: "get",
    url: "https://api.themoviedb.org/3/movie/550?api_key=2aba01b0fce18e86ed1cee2e83403b06",
  });

  return { props: { data } };
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
