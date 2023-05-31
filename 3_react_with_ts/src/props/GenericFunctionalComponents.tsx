interface Props<T> {
  data: T;
}

export const GenericFunctionalComponents = <T extends {}>({ data }: Props<T>) => {
  return (
    <>
      {JSON.stringify(data)}
    </>
  );
};