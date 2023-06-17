export const swapUp = (id: string, order: string[]): string[] => {
  let index = order.indexOf(id);

  if (index === -1 || index === 0) return order;
  let temp = order[index - 1];
  order[index] = temp;
  order[index - 1] = id;
  return order;
};

export const swapDown = (id: string, order: string[]): string[] => {
  let index = order.indexOf(id);

  if (index === -1 || index === order.length - 1) return order;
  let temp = order[index + 1];
  order[index] = temp;
  order[index + 1] = id;
  return order;
};
