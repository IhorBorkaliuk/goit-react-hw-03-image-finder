import { TailSpin } from 'react-loader-spinner';


export const Loader = () => {
  return (
    <TailSpin
      height="80"
      width="80"
      color="#0b22ed"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}