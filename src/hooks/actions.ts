import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { githubActions } from '../redux/github/github.slice'

const actions = {
  ...githubActions,
}

//Хук позволяет более удобно работать с actions в проекте
export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
