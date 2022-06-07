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
    public static readonly todoApi = {
        token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDU4MzQ5Mn0.Plb20khqKYTuMqUJSYKPUVrhvuC2ct_RaHwUWdFRBsg",
        invaldtoken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOThdhdyyukiiolhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU",
        fetchTodourl: "/api/v1/todo/fetchtodo",
        deleteTodourl:"/api/v1/todo/deletetodo",
        deleteTodoId:"/629ee88f66ac7b6b35bc69be",
        deleteTodoInvalidId:"/629af2f118e237aea678f1ds",
        deleteTodoNotFound:"/629af2f118e237aea678f16c",
        deleteTodotypefalse:"/629af2f118e237aea678f162",
        deleteTodoOfOthers:"/629eeb10697fc63489c3b658"
        
    };
    public static readonly successCode = 200;
    public static readonly requestFail = 400;
    public static readonly validationFail = 422;
    public static readonly unauthorise = 401;
    public static readonly notFound = 404;
    public static readonly internalServerErr = 500;
    public static readonly redirectCode = 301;
}
