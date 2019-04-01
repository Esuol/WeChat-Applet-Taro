let handleMonth:(month: number) => string =
    function(month:number): string {
      return month.toString().length === 1 ?  "0" + month : month.toString()
    }
let getDay:(day:number,date:string) => string =
    function(day:number,date:string): string {
      let today = new Date(date)
      let currentTime: number = today.getTime() 

      today.setTime(currentTime)
      let tYear:number = today.getFullYear()
      let tMonth:number = today.getMonth()
      let tDate: number = today.getDate()
      return handleMonth(tMonth + 1)+"/"+handleMonth(tDate);
    }
let getDays:(day:number,date:string) => string[] =
    function(day:number,date:string): string[] {
      let arr: string[] = []
      for(let i = day; i<0; i++){
        arr.push(getDay(i,date))
      }
      return arr
    }
export default getDays