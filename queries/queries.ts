import { useMutation, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "queries/queryKeys";
import { getMovieDetail, getMovies, getNameData, postMovieRate } from "apis/api";
import { AxiosError } from "axios";

export const useFetchUserName = (): UseQueryResult<IUserInfo, AxiosError> =>
  useQuery(QUERY_KEYS.USER_NAME, () => getNameData());

export const useFetchMovies = (): UseQueryResult<{ results: IMovieDetail[] }, AxiosError> =>
  useQuery(QUERY_KEYS.MOVIE_LIST, () => getMovies());

export const useFetchMovieDetail = (movie_id: number): UseQueryResult<IMovieDetail, AxiosError> =>
  useQuery(QUERY_KEYS.MOVIE_DETAIL, () => getMovieDetail(movie_id));

export const usePostMovieRate = () =>
  useMutation(({ movie_id, score }: { movie_id: number; score: number }) =>
    postMovieRate(movie_id, score)
  );

// 나중에 option parameter error
// export const useFetchMovieDetail = (
//   movie_id: number,
//   options?: UseQueryOptions<IMovieDetail, AxiosError>
// ): UseQueryResult<IMovieDetail, AxiosError> => {
//   return useQuery(QUERY_KEYS.MOVIE_DETAIL, () => getMovieDetail(movie_id), options);
// };
