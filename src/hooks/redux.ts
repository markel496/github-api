import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

//Экспортирую свой собственный хук, который позволяет забирать данные из store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
