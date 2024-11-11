export const secondsToTime = (seconds: number) => {
  let minStr, secStr;
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);

  min < 10 ? minStr = `0${min}` : minStr = ''+min;
  sec < 10 ? secStr = `0${sec}` : secStr = ''+sec;

  return {
    minStr,
    secStr
  }
}