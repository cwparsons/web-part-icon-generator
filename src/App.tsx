/** @jsx jsx */

import { Box, Flex, Text } from 'rebass';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { useCallback, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

import { ErrorBoundary } from './components/ErrorBoundary';
import { FluentUIIcons } from './components/FluentUIIcons';
import { getSvg } from './get-svg';

type AppState = { name: string; glyph: string; svg: string };

const DEFAULT_EMBEDDED_ICON = `<svg x="calc(100% - 12px)">
  <g fill="#fff">
    <circle cx="6" cy="6" r="6" fill="#00ADE9"/>
    <path d="M1.9 6.1a2 2 0 002.2 2.2c.7 0 1.3-.3 1.7-.7a2.5 2.5 0 01-.5-1.8H4v.8h1v.6c-.3.2-.6.2-1 .2-.6 0-1.2-.5-1.2-1.3 0-.7.6-1.3 1.2-1.3.5 0 .8.2 1 .5l.7-.7C5.2 4.2 4.7 4 4 4 2.8 4 1.9 5 1.9 6.1z" clip-rule="evenodd"/>
    <path d="M5.6 6.1C5.6 5 6.6 4 7.8 4 9.1 4 10 5 10 6.1c0 1.2-1 2.2-2.2 2.2-1.2 0-2.2-1-2.2-2.2zm1 0c0 .7.5 1.3 1.2 1.3.8 0 1.3-.6 1.3-1.3 0-.7-.6-1.3-1.3-1.3-.7 0-1.2.6-1.2 1.3z" clip-rule="evenodd"/>
  </g>
</svg>`;

export default function App() {
  const theme = useTheme();
  const [appState, setAppState] = useState<AppState | null>(null);
  const embeddedIcon = useRef<string>(DEFAULT_EMBEDDED_ICON);

  const encodeState = encodeURIComponent(appState?.svg ?? '');

  const changeSvg = useCallback(
    (glyph: string, name: string) => {
      getSvg(glyph, embeddedIcon.current).then((svg) => {
        if (!svg) {
          return;
        }

        setAppState({
          svg,
          glyph,
          name
        });
      });
    },
    [embeddedIcon]
  );

  return (
    <Flex css={{ flexDirection: 'column', height: '100%', padding: theme.space[3] }}>
      <Text as="h1" css={{ marginBottom: theme.space[4] }} variant="h2">
        Web part icon generator
      </Text>

      <Flex
        css={{
          flex: 1,
          gap: theme.space[8],
          maxHeight: 'calc(100vh - 6rem)'
        }}
      >
        <Flex css={{ flexBasis: 0 }} flexGrow={1} flexDirection="column">
          <FluentUIIcons onClick={changeSvg} />
        </Flex>

        <Flex
          css={{
            flexBasis: 0,
            flexDirection: 'column',
            flexGrow: 1,
            gap: 24
          }}
        >
          <Text as="h2" variant="h4">
            Embedded icon
          </Text>

          <Box css={{ border: `1px solid ${theme.colors.neutralDark}`, flexGrow: 1 }}>
            <Editor
              height="300px"
              defaultValue={embeddedIcon.current}
              defaultLanguage="xml"
              options={{
                wordWrap: 'off'
              }}
              onChange={(newValue) => {
                embeddedIcon.current = newValue ?? '';

                if (appState) {
                  changeSvg(appState.glyph, appState.name);
                }
              }}
            />
          </Box>

          <Text as="h2" variant="h4">
            Icon preview
          </Text>

          <ErrorBoundary>
            <div dangerouslySetInnerHTML={{ __html: appState?.svg ?? '' }} />
          </ErrorBoundary>

          <Text as="h3" variant="h4">
            Code for manifest:
          </Text>

          <Box css={{ border: `1px solid ${theme.colors.neutralDark}`, flexGrow: 1 }}>
            <Editor
              height="100%"
              defaultLanguage="json"
              options={{
                readOnly: true,
                wordWrap: 'on'
              }}
              value={`// "officeFabricIconFontName": "${appState?.name ?? ''}",\n"iconImageUrl": "data:image/svg+xml,${encodeState}",`}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
