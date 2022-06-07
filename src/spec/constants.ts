export default class Constants {
  public static readonly habitApi = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU",
    invaldtoken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOThdhdyyukiiolhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU",
    addHabiturl: "/api/v1/habit/addhabit",
    updateHabiturl: "/api/v1/habit/updatehabit/",
    deleteHabiturl: "/api/v1/habit/deletehabit/",
    fetchHabiturl: "/api/v1/habit/fetchhabit",
    actualdeletehabitId: "629b29f3b25c4830210b5ed2",
    deletehabitId: "629a023eed78fcd51d91e887",
    invalidHabitId: "629a023eed78fcd51d91e885547",
    anotherUserHabitId:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWVlNjhkZTZjNmUwMzZlZTQwMWEwMyIsImVtYWlsIjoidGV3YW5pcHVuaXRrdW1hckBnbWFpbC5jb20iLCJpYXQiOjE2NTQ1ODA5ODV9.o7oGa-eW7wghSliCtD5apOsvPtE2ZHhAImfoM96PfYI",
    updateHabitId: "629b29d814a122df7332f1a1",
    challangeHabitId: "629af2f118e237aea678f156",
  };
  public static readonly successCode = 200;
  public static readonly requestFail = 400;
  public static readonly validationFail = 422;
  public static readonly unauthorise = 401;
  public static readonly notFound = 404;
  public static readonly internalServerErr = 500;
  public static readonly redirectCode = 301;
}
