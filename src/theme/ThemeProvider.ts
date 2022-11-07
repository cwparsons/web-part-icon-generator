import { createElement, useEffect } from 'react';

import { loadTheme } from '@fluentui/react/lib/Styling';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

import importedTheme from './theme.json';

type ThemeProviderProps = {
  children?: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = (importedTheme as any).default ?? importedTheme;

  const mergedTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      ...{
        msAccess: '#a4373a',
        msExchange: '#0078d4',
        msExcel: '#217346',
        msOffice: '#d83b01',
        msOneDrive: '#0078d4',
        msOneNote: '#7719aa',
        msPlanner: '#31752f',
        msPowerApps: '#742774',
        msPowerPoint: '#b7472a',
        msPublisher: '#077568',
        msSharePoint: '#0078d4',
        msSkype: '#0078d4',
        msSway: '#008272',
        msTeams: '#6264a7',
        msVisio: '#3955a3',
        msWord: '#2b579a',
        msYammer: '#106ebe'
      }
    }
  };

  useEffect(() => {
    loadTheme({ palette: theme.colors });
  }, []);

  return createElement(EmotionThemeProvider, { theme: mergedTheme, children });
};

ThemeProvider.displayName = 'ThemeProvider';
