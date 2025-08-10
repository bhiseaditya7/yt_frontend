import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeVariantsProps } from '../../theme';

interface ThemeState {
  themeMode: ThemeVariantsProps;
}

const initialState: ThemeState = {
  themeMode: ThemeVariantsProps.light,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeVariantsProps>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice; 