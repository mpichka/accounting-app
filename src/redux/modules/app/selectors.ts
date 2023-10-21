import { RootState } from '@/redux/store';

export const getAppErrorMessage = (store: RootState) => store.app.error;
export const getCurrentPage = (store: RootState) => store.app.page;
