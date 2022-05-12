import Daily from "../Models/Daily";
function clearArray() {
  let dateone: any = new Date();
  let datetwo: any = new Date();
  datetwo.setHours(23);
  datetwo.setMinutes(59);
  datetwo.setSeconds(59);
  const diff = datetwo - dateone;
  setTimeout(myFunction, diff);
  function myFunction() {
    Daily.find({}, (err: any, data: any) => {
      if (err) {
        return console.log(err);
      }
      data.forEach((daily: any) => {
        daily.completedParticipants = [];
        daily.save();
      });
    });
    

    setTimeout(myFunction, 86400000);
  }
}
export default clearArray;
