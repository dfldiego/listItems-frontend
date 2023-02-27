type Props = {
  loading: boolean;
};

const Loading = ({ loading }: Props) => {
  return (
    <>
      {loading && (
        <div
          className="spinner mt5 loadingGrid"
          data-testid="loading-test-id"
        ></div>
      )}
    </>
  );
};

export default Loading;
