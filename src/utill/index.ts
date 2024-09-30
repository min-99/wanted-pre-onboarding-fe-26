export const formatNumberWithCommas = (number: number): string => {
  return number.toLocaleString("en-US");
};

export const formatDate = (date: string, format: string): string => {
  const _date = new Date(date);
  const map: { [key: string]: string } = {
    YYYY: _date.getFullYear().toString(),
    MM: ("0" + (_date.getMonth() + 1)).slice(-2),
    DD: ("0" + _date.getDate()).slice(-2),
    HH: ("0" + _date.getHours()).slice(-2),
    mm: ("0" + _date.getMinutes()).slice(-2),
    ss: ("0" + _date.getSeconds()).slice(-2),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/gi, (matched) => map[matched]);
};
