import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from '../redux/github/github.api'
import { useDebounce } from '../hooks/debounce'
import closeIcon from '../img/close_icon.svg'
import RepoCard from '../components/RepoCard'
import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'

const HomePage: React.FC = () => {
  const { changeRepositories, setSearchValue } = useActions()
  const { repositories, searchValue } = useAppSelector((state) => state.github)

  const debounced = useDebounce(searchValue)
  const [dropdown, setDropdown] = useState(false)

  //для текста, когда нет репозиториев
  const [showText, setShowText] = useState(false)
  const [user, setUser] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const isRender = useRef(false)

  const {
    isError,
    isLoading,
    data: users,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3, //не делать запрос, когда ввел меньше 3-х символов
    refetchOnFocus: true, //автоматический запрос, если вернулись на вкладку
  })

  const [fetchRepos, { data, isLoading: areReposLoading }] =
    useLazyGetUserReposQuery() //fetchRepos - функция, которая позволит подгружать данные по запросу

  const clearInput = () => {
    setSearchValue('')
    showText && setShowText(false)
    inputRef.current?.focus()
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    showText && setShowText(false)
  }

  const clickHandler = (username: string) => {
    fetchRepos(username)
    setDropdown(false)
    setUser(username)
    setSearchValue(username)
    isRender.current = false
  }

  useEffect(() => {
    setDropdown(isRender.current && debounced.length > 3 && users?.length! > 0)
    isRender.current = true
  }, [users])

  useEffect(() => {
    data && changeRepositories(data)
    data?.length === 0 && setShowText(true)
  }, [data])

  return (
    <div className="flex justify-center py-10 px-5 h-full w-full">
      <div className="max-w-[560px] w-full relative">
        <input
          type="text"
          ref={inputRef}
          className="border px-4 py-2 w-full h-[42px] mb-2 outline-none"
          placeholder="Search for GitHub username..."
          value={searchValue}
          onChange={(e) => changeHandler(e)}
        />
        {searchValue && (
          <img
            src={closeIcon}
            alt="Закрыть"
            className="absolute w-5 h-5 top-0 right-[10px] translate-y-[50%] opacity-40 cursor-pointer transition-opacity hover:opacity-70"
            onClick={clearInput}
          />
        )}

        {isError && (
          <p className="mb-1 text-center text-red-700">
            Ошибка получения данных
          </p>
        )}

        {dropdown && (
          <ul className="absolute list-none t-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <li className="text-center">loading...</li>}
            {users?.map((user) => (
              <li
                key={user.id}
                className="px-2 py-1 hover:bg-gray-400 hover:text-white transition-colors cursor-pointer"
                onClick={() => clickHandler(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className="container">
          {areReposLoading && (
            <p className="text-center">Repositories are loading...</p>
          )}
          {/* dxxc */}
          {showText && users && (
            <p className="text-center">
              The user "{user}" has no repositories.
            </p>
          )}
          {repositories?.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
