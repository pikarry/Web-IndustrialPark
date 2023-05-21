export const formatMoneyVN = (
  money: number | string,
  options?: Intl.NumberFormatOptions
) => {
  return Intl.NumberFormat("vi-VN", options).format(Number(money));
};

export const convertFileToBase64 = (file: File) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
