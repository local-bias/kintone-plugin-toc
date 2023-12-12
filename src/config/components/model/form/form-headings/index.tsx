import { IconButton, Tooltip } from '@mui/material';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';
import SpaceSelect from './space-select';
import ColorForm from './color';
import LabelForm from './label';

import { headingsLengthState, headingsState } from '../../../../states/plugin';

const Component: FC = () => {
  const length = useRecoilValue(headingsLengthState);
  const isMultiple = length > 1;

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
      {new Array(length).fill('').map((_, i) => (
        <div key={i} className='flex items-center gap-2'>
          <SpaceSelect index={i} />
          <LabelForm index={i} />
          <ColorForm index={i} />
          <Tooltip title='フィールドを追加する'>
            <IconButton size='small' onClick={() => addField(i)}>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          {isMultiple && (
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
