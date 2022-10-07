import { useMutation, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "queries/queryKeys";
import { getMovieDetail, getMovies, getNameData, postMovieRate } from "apis/api";
import { AxiosError } from "axios";

export const useFetchUserName = () =>
  useQuery<IMovieDetail>(QUERY_KEYS.USER_NAME, () => getNameData());

export const useFetchMovies = () => useQuery(QUERY_KEYS.MOVIE_LIST, () => getMovies());

export const useFetchMovieDetail = (movie_id: number) =>
  useQuery<IMovieDetail>(QUERY_KEYS.MOVIE_DETAIL, () => getMovieDetail(movie_id));

export const usePostMovieRate = () =>
  useMutation(({ movie_id, score }: { movie_id: number; score: number }) =>
    postMovieRate(movie_id, score)
  );
