import Image from "next/image";
import styled from "styled-components";
import axios from "axios";
import { GetServerSideProps } from "next";
import sample from "../public/images/sample.jpg";
import sample2 from "../public/images/sample2.jpg";

interface IHomeProps {
  data: {
    name: string;
  };
}

const Home = ({ data }: IHomeProps) => {
  return (
    <>
      <TextSection>
        <div className="text_container">
          <h2 className="title">Next js Template</h2>
          <h3 className="author">by {data.name}</h3>
        </div>
      </TextSection>
      <ImageSection>
        <div className="img_container">
          <Image
            src={sample}
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
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
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
            src={sample2}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios({
    method: "get",
    url: "http://localhost:3000/api/name",
  });

  return {
    props: {
      data,
    },
  };
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
