import { ReactNode } from "react";
import styled from "styled-components";

export const ErrorFallback = ({ error, reset }: RenderFallbackProps) => {
  return (
    <Wrapper>
      Error: {error.message}{" "}
      <button
        onClick={() => {
          reset([1]);
        }}
      >
        reset
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.mixin.flexCenter};
  font-size: 30px;
`;
