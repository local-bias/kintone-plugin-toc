import { Skeleton, TextField } from '@mui/material';
import React, { ChangeEventHandler, FC, FCX, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { tocTitleState } from '../../../states/plugin';
import styled from '@emotion/styled';

const Component: FCX = ({ className }) => {
  const value = useRecoilValue(tocTitleState);

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      ({ target }) => {
        set(tocTitleState, target.value);
      },
    []
  );

  return (
    <div className={className}>
      <TextField
        sx={{ width: '350px' }}
        variant='outlined'
        color='primary'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const Placeholder: FCX = ({ className }) => (
  <div className={className}>
    <Skeleton variant='rounded' width={360} height={56} />
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
