export const makeSizes = (size: string) => {
  const res: string[] = size?.split(",");
  return res;
};

export const resizeName=(name: string, maxSize: number)=>{
  const resize= maxSize - 3
  if (name?.length > maxSize) {
    name = name.substring(0, resize) + "...";
  }
  return name
}