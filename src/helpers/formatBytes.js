const units = ['bytes', 'KiB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   
export const pickBetterBytes = (x) => {

  let l = 0
  let n = parseInt(x, 10) || 0;

  while(n >= 1024 && ++l){
      n = n/1024;
  }
  
  return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}