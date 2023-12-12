import { getHeadingLabelState, headingRowState } from '@/config/states/plugin';
import { TextField } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

type Props = { index: number };

const Component: FC<Props> = ({ index }) => {
  const label = useRecoilValue(getHeadingLabelState(index));

  const onChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(headingRowState(index), (current) => ({ ...current, label: value }));
      },
    [index]
  );

  return (
    <TextField
      sx={{ width: '350px' }}
      label='ラベル'
      variant='outlined'
      color='primary'
      value={label}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Component;
