export const arrayRange = (length: number) => {
  return Array.from({ length }).map((_, i) => i);
};

export const readAsDataURL = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const getReadableFileSizeString = (bytes: number) => {
  const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let i = -1;

  do {
    bytes /= 1024;
    i++;
  } while (bytes > 1024);

  return Math.max(bytes, 0.1).toFixed(1) + " " + units[i];
};
