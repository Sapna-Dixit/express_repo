let numberClass: { _id: string; name: string }[];
let stringClass: { _id: string; name: string }[];
export const classList = (data: { _id: string; name: string }[]) => {
  numberClass = [];
  stringClass = [];
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let dataToDisplay = data;
  dataToDisplay?.map((item: { name: string; _id: string }) => {
    if (numbers?.includes(Number(item?.name?.charAt(0)))) {
      if (item?.name?.length === 3) {
        numberClass?.push({ ...item, name: '0' + item?.name });
      } else {
        numberClass?.push(item);
      }
    } else {
      stringClass?.push(item);
    }
  });
  stringClass?.sort((a: { name: string }, b: { name: string }) =>
    a?.name?.localeCompare(b?.name)
  );
  numberClass?.sort(
    (a, b) => Number(a?.name?.slice(0, 2)) - Number(b?.name?.slice(0, 2))
  );
  const finalClass = numberClass?.map((item) => {
    if (item?.name?.charAt(0) === '0') {
      return { ...item, name: item?.name?.substring(1, item?.name?.length) };
    } else {
      return item;
    }
  });
  dataToDisplay = [...finalClass, ...stringClass];
  const dataClass = dataToDisplay?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });
  return dataClass;
};
