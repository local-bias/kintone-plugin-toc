import { appSpacesState } from '@/config/states/kintone';
import { getHeadingSpaceIdState, headingRowState } from '@/config/states/plugin';
import { Autocomplete, Skeleton, TextField } from '@mui/material';
import React, { FC, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

type Props = {
  index: number;
};

const Component: FC<Props> = ({ index }) => {
  const spaces = useRecoilValue(appSpacesState);
  const spaceId = useRecoilValue(getHeadingSpaceIdState(index));

  const onChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(headingRowState(index), (current) => ({ ...current, spaceId: value }));
      },
    [index]
  );

  return (
    <Autocomplete
      value={spaces.find((field) => field.elementId === spaceId) ?? null}
      sx={{ width: '350px' }}
      options={spaces}
      isOptionEqualToValue={(option, v) => option.elementId === v.elementId}
      getOptionLabel={(option) => `${option.elementId}`}
      onChange={(_, field) => onChange(field?.elementId ?? '')}
      renderInput={(params) => (
        <TextField {...params} label='対象スペース' variant='outlined' color='primary' />
      )}
    />
  );
};

const PlaceHolder: FC = () => {
  return <Skeleton variant='rounded' width={350} height={56} />;
};

const Container: FC<Props> = (props) => {
  return (
    <Suspense fallback={<PlaceHolder />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Container;
