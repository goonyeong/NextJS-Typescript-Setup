import Image from "next/image";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <TextSection>
        <div className="text_container">
          <h2 className="title">Next js Template</h2>
          <h3 className="author">by Asher</h3>
        </div>
      </TextSection>
      <ImageSection>
        <div className="img_container">
          <Image
            src="/images/sample.jpg"
            alt="sample"
            layout="fill"
            objectFit="cover"
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
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem.
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
          />
        </div>
      </ImageSection>
    </>
  );
};

export default Home;

const TextSection = styled.section`
  width: 100%;
  height: 400px;
  ${({ theme }) => theme.mixin.flexCenter}
  padding: 50px;
  .text_container {
    .title,
    .author,
    .desc {
      text-align: center;
    }
    .title {
      font-size: 5rem;
      color: ${({ theme }) => theme.colors.primary_color};
    }
    .author {
      font-size: 3rem;
    }
    .desc {
      font-size: 2rem;
      word-break: keep-all;
    }
  }
`;

const ImageSection = styled.section`
  width: 100%;
  .img_container {
    width: 100%;
    height: 400px;
    position: relative;
  }
`;
