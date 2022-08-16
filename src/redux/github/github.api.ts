import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' //дописал /react
import { IRepo, IUser, ServerResponse } from '../../models/models'

export const githubApi = createApi({
  //адрес в store, где будут храниться все необходимые закешированные данные, когда будем работать с API
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
  }),
  // refetchOnFocus: true,
  endpoints: (build) => ({
    //Первый дженерик указывает на то, что мы получаем в ответе от сервера. Второй - какой параметр мы хотим принимать для того, чтобы осуществить данный запрос
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items,
    }),

    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
      }),
    }),
    //Для образца
    createUser: build.mutation<any, void>({
      query: () => '',
    }),
  }),
})

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi
//хук useSearchUsersQuery генерируется автоматически, в зависимости от того, что мы указали в endpoints
