let getday:(num:number,str:string) => string =
    function(num:number,str:string):string {
      let today:any = new Date();
      let nowTime:number = today.getTime();
      let ms:number = 24*3600*1000*num;
      today.setTime(parseInt(nowTime + ms));
      let oYear:number = today.getFullYear();
      let oMoth:string = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = '0' + oMoth;
      let oDay:string = today.getDate().toString();
      if (oDay.length <= 1) oDay = '0' + oDay;
      return oYear + str + oMoth + str + oDay;
    }
export default getday