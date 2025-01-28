export const makeSizes = (size) => {
  const res = size?.split(",");
  return res;
};

export const resizeName=(name, maxSize)=>{
  const resize= maxSize - 3
  if (name?.length > maxSize) {
    name = name.substring(0, resize) + "...";
  }
  return name
}