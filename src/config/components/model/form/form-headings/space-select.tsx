import { appSpacesState } from '@/config/states/kintone';
import { Autocomplete, Skeleton, TextField } from '@mui/material';
import React, { FC, Suspense } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {
  spaceId: string;
  onHeadingSpaceIdChange: (value: string) => void;
};

const Component: FC<Props> = ({ spaceId, onHeadingSpaceIdChange }) => {
  const spaces = useRecoilValue(appSpacesState);
  return (
    <Autocomplete
      value={spaces.find((field) => field.elementId === spaceId) ?? null}
      sx={{ width: '350px' }}
      options={spaces}
      isOptionEqualToValue={(option, v) => option.elementId === v.elementId}
      getOptionLabel={(option) => `${option.elementId}`}
      onChange={(_, field) => onHeadingSpaceIdChange(field?.elementId ?? '')}
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
