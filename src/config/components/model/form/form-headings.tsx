import { Autocomplete, IconButton, Skeleton, TextField, Tooltip } from '@mui/material';
import React, { FC, FCX, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';

import { appSpacesState } from '../../../states/kintone';
import { headingsState } from '../../../states/plugin';
import styled from '@emotion/styled';
import { DEFAULT_COLOR } from '@/lib/static';

const Component: FCX = ({ className }) => {
  const headings = useRecoilValue(headingsState);
  const spaces = useRecoilValue(appSpacesState);

  const onHeadingSpaceIdChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: string) => {
        set(headingsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex].spaceId = value;
          })
        );
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
    <div className={className}>
      {headings.map((heading, i) => (
        <div key={i} className='row'>
          <Autocomplete
            value={spaces.find((field) => field.elementId === heading.spaceId) ?? null}
            sx={{ width: '350px' }}
            options={spaces}
            isOptionEqualToValue={(option, v) => option.elementId === v.elementId}
            getOptionLabel={(option) => `${option.elementId}`}
            onChange={(_, field) => onHeadingSpaceIdChange(i, field?.elementId ?? '')}
            renderInput={(params) => (
              <TextField {...params} label='対象スペース' variant='outlined' color='primary' />
            )}
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

const Placeholder: FCX = ({ className }) => (
  <div className={className}>
    {new Array(3).fill('').map((_, i) => (
      <div key={i} className='row'>
        <Skeleton variant='rounded' width={360} height={56} />
        <Skeleton variant='circular' width={24} height={24} />
        <Skeleton variant='circular' width={24} height={24} />
      </div>
    ))}
  </div>
);

const Styling = (Component: FC) => styled(Component)`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const StyledComponent = Styling(Component);
const StyledPlaceHolder = Styling(Placeholder);

const Container: FC = () => {
  return (
    <Suspense fallback={<StyledPlaceHolder />}>
      <StyledComponent />
    </Suspense>
  );
};

export default memo(Container);
