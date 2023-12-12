import { getHeadingColorState, headingRowState } from '@/config/states/plugin';
import { DEFAULT_COLOR } from '@/lib/static';
import { TextField } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

type Props = { index: number };

const Component: FC<Props> = ({ index }) => {
  const color = useRecoilValue(getHeadingColorState(index));

  const onChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(headingRowState(index), (current) => ({ ...current, color: value }));
      },
    [index]
  );

  return (
    <TextField
      type='color'
      sx={{ width: '120px' }}
      label='ヘッダーの色'
      variant='outlined'
      color='primary'
      value={color ?? DEFAULT_COLOR}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Component;
