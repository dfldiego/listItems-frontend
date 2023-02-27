type Props = {
  error: string;
  loading: boolean;
};

const Error = ({ error, loading }: Props) => {
  return (
    <>
      {!loading && error.length > 0 && (
        <p className="error mt5 errorGrid">{error}</p>
      )}
    </>
  );
};

export default Error;
