export default class Constants {
  public static readonly habitApi = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU",
    invaldtoken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOThdhdyyukiiolhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU",
    addHabiturl: "/api/v1/habit/addhabit",
    updateHabiturl: "",
    deleteHabiturl: "/api/v1/habit/deletehabit",
    fetchHabiturl: "",
    actualdeletehabitId: "",
    deletehabitId: "",
    invalidHabitId: "",
    anotherUserHabitId: "",
    updateHabitId: "",
    challangeHabitId: "",
  };
  public static readonly successCode = 200;
  public static readonly requestFail = 400;
  public static readonly validationFail = 422;
  public static readonly unauthorise = 401;
  public static readonly notFound = 404;
  public static readonly internalServerErr = 500;
  public static readonly redirectCode = 301;
}