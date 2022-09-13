//日付から文字列に変換する関数
export const getStringFromDate = (date: Date) => {
  var year_str = date.getFullYear();
  //月だけ+1すること
  var month_str = 1 + date.getMonth();
  var day_str = date.getDate();
  var hour_str = date.getHours();
  var minute_str = date.getMinutes();
  var second_str = date.getSeconds();

  let format_str = 'YYYY-MM-DD hh:mm:ss';
  format_str = format_str.replace(/YYYY/g, year_str.toString());
  format_str = format_str.replace(/MM/g, month_str.toString());
  format_str = format_str.replace(/DD/g, day_str.toString());
  format_str = format_str.replace(/hh/g, hour_str.toString());
  format_str = format_str.replace(/mm/g, minute_str.toString());
  format_str = format_str.replace(/ss/g, second_str.toString());

  return format_str;
};
