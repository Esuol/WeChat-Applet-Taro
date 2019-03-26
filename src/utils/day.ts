let handleMonth:(month: number) => string =
    function(month:number): string {
      return month.toString().length === 1 ?  "0" + month : month.toString()
    }
let getDay:(day:number) => string =
    function(day:number): string {
      let today = new Date()
      let currentTime: number = today.getTime() + 1000*60*60*24*day

      today.setTime(currentTime)
      let tYear:number = today.getFullYear()
      let tMonth:number = today.getMonth()
      let tDate: number = today.getDate()
      return handleMonth(tMonth + 1)+"/"+handleMonth(tDate);
    }
let getDays:(day:number) => string[] =
    function(day:number): string[] {
      let arr: string[] = []
      for(let i = day; i<0; i++){
        arr.push(getDay(i))
      }
      return arr
    }
export default getDays