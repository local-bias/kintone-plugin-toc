import { IconButton, TextField, Tooltip } from '@mui/material';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';
import SpaceSelect from './space-select';

import { headingsState } from '../../../../states/plugin';
import { DEFAULT_COLOR } from '@/lib/static';

const Component: FC = () => {
  const headings = useRecoilValue(headingsState);

  const createHeadingSpaceIdChangeHandler = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        return (value: string) => {
          set(headingsState, (current) =>
            produce(current, (draft) => {
              draft[rowIndex].spaceId = value;
            })
          );
        };
      },
    []
  );

  const onHeadingLabelState = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: string) => {
        set(headingsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex].label = value;
          })
        );
      },
    []
  );

  const onHeadingColorChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: string) => {
        set(headingsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex].color = value;
          })
        );
      },
    []
  );

  const addField = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(headingsState, (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex + 1, 0, {
              spaceId: '',
              label: '',
            });
          })
        );
      },
    []
  );

  const removeField = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(headingsState, (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex, 1);
          })
        );
      },
    []
  );

  return (
    <div className='flex flex-col gap-4'>
      {headings.map((heading, i) => (
        <div key={i} className='flex items-center gap-2'>
          <SpaceSelect
            spaceId={heading.spaceId}
            onHeadingSpaceIdChange={createHeadingSpaceIdChangeHandler(i)}
          />
          <TextField
            sx={{ width: '350px' }}
            label='ラベル'
            variant='outlined'
            color='primary'
            value={heading.label}
            onChange={(e) => onHeadingLabelState(i, e.target.value)}
          />
          <TextField
            type='color'
            sx={{ width: '120px' }}
            label='ヘッダーの色'
            variant='outlined'
            color='primary'
            value={heading.color ?? DEFAULT_COLOR}
            onChange={(e) => onHeadingColorChange(i, e.target.value)}
          />
          <Tooltip title='フィールドを追加する'>
            <IconButton size='small' onClick={() => addField(i)}>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          {headings.length > 1 && (
            <Tooltip title='このフィールドを削除する'>
              <IconButton size='small' onClick={() => removeField(i)}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(Component);
