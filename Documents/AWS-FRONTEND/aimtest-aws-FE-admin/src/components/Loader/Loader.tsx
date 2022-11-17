import { Backdrop, CircularProgress } from '@mui/material';
export const Loader = (props: { open: boolean }) => {
  return (
    <Backdrop
      sx={{ color: '#ffa500', zIndex: (theme) => theme.zIndex.drawer + 2 }}
      open={props.open}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};
