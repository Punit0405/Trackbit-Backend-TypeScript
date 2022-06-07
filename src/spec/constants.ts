export default class Constants {
    public static readonly token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU";
    public static readonly invalidtoken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOThdhdyyukiiolhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU";
    public static readonly habitApi = {
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
    public static readonly todoApi = {
        addTodourl: "/api/v1/todo/addtodo",
        fetchTodourl: "/api/v1/todo/fetchtodo",
        deleteTodourl: "/api/v1/todo/deletetodo",
        deleteTodoId: "/629ee88f66ac7b6b35bc69be",
        deleteTodoInvalidId: "/629af2f118e237aea678f1ds",
        deleteTodoNotFound: "/629af2f118e237aea678f16c",
        deleteTodotypefalse: "/629af2f118e237aea678f162",
        deleteTodoOfOthers: "/629eeb10697fc63489c3b658"
    };
    public static readonly userApi = {
        decreaseUserExperienceurl: "/api/v1/user/decreaseUserHealth",
        getUserlevelurl: "/api/v1/user/fetchuserlevels",
        increaseUserlevelurl: "/api/v1/user/increaseUserExperience",
        fetchUserdetailsurl: "/api/v1/user/fetchuser",
        userLoginurl: "/api/v1/user/userlogin",
        userRegistration: "/api/v1/user/userregister"
    };
    public static readonly successCode = 200;
    public static readonly requestFail = 400;
    public static readonly validationFail = 422;
    public static readonly unauthorise = 401;
    public static readonly notFound = 404;
    public static readonly internalServerErr = 500;
    public static readonly redirectCode = 301;
}

