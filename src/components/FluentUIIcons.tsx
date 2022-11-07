/** @jsx jsx */

import * as React from 'react';

import { Box, Flex } from 'rebass';
import { jsx } from '@emotion/core';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { TextField } from '@fluentui/react/lib/TextField';
import { List } from '@fluentui/react/lib/List';

import Icons from '../icons.json';

type FluentUIIcon = {
  name: string;
  glyph: string;
};

const ROWS_PER_PAGE = 6;
const MAX_ROW_HEIGHT = 115;

export const FluentUIIcons = ({ onClick }: { onClick: (glyph: string, name: string) => void }) => {
  const originalItems = Object.keys(Icons).map((name) => ({ name, glyph: Icons[name] } as FluentUIIcon));
  const [items, setItems] = React.useState(originalItems);

  const resultCountText = items.length === originalItems.length ? '' : ` (${items.length} of ${originalItems.length} shown)`;

  const onFilterChanged = (_: any, text: string): void => {
    const query = text.toLowerCase();

    setItems(originalItems.filter((item) => item.name.toLowerCase().indexOf(query) >= 0));
  };

  const columnCount = React.useRef(0);
  const rowHeight = React.useRef(0);

  const getItemCountForPage = React.useCallback((itemIndex: number, surfaceRect: IRectangle) => {
    if (itemIndex === 0) {
      columnCount.current = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      rowHeight.current = Math.floor(surfaceRect.width / columnCount.current);
    }

    return columnCount.current * ROWS_PER_PAGE;
  }, []);

  const getPageHeight = React.useCallback((): number => {
    return rowHeight.current * ROWS_PER_PAGE;
  }, []);

  const onRenderCell = React.useCallback((item: FluentUIIcon) => {
    return (
      <div
        css={{
          float: 'left'
        }}
        style={{
          width: 100 / columnCount.current + '%'
        }}
      >
        <div
          css={{
            margin: 8
          }}
        >
          <div
            css={{
              paddingTop: '100%',
              position: 'relative'
            }}
          >
            <div
              css={{
                alignItems: 'center',
                borderRadius: 2,
                bottom: 0,
                boxShadow: '0 2px 4px -0.75px rgb(0 0 0 / 10%)',
                color: '#3b3a39',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                fontSize: 28,
                justifyContent: 'center',
                left: 0,
                overflow: 'hidden',
                position: 'absolute',
                right: 0,
                top: 0
              }}
              data-is-focusable={true}
              onClick={() => {
                onClick(item.glyph, item.name);
              }}
            >
              <span css={{ cursor: 'pointer', fontFamily: 'FabricMDL2Icons' }}>{item.glyph}</span>
              {/* <span>{item.name}</span> */}
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <Flex
        css={{
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box
          css={{
            marginBottom: '1rem'
          }}
        >
          <TextField label={'Filter by name' + resultCountText} onChange={onFilterChanged} />
        </Box>

        <Box
          css={{
            maxHeight: 'calc(100vh - 11rem)',
            overflowY: 'scroll'
          }}
        >
          <List
            getItemCountForPage={getItemCountForPage}
            getPageHeight={getPageHeight}
            renderedWindowsAhead={3}
            onRenderCell={onRenderCell}
            items={items}
          />
        </Box>
      </Flex>
    </FocusZone>
  );
};
