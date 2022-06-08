// {"userId":ObjectId('629ee68de6c6e036ee401a03')}
export default class Constants {

    public static readonly token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU";
    public static readonly invalidtoken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOThdhdyyukiiolhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU";
    public static readonly habitApi = {
        addHabiturl: "/api/v1/habit/addhabit",
        updateHabiturl: "/api/v1/habit/updatehabit/",
        deleteHabiturl: "/api/v1/habit/deletehabit/",
        fetchHabiturl: "/api/v1/habit/fetchhabit",
        actualdeletehabitId: "629b2a7e005c9a9bd675d006",
        deletehabitId: "629a023eed78fcd51d91e887",
        invalidHabitId: "629a023eed78fcd51d91e885547",
        anotherUserHabitId:"629ee730609daa4f13689047",
        updateHabitId: "629edecdd35b61e04d1bec69",
        challangeHabitId: "629af2f118e237aea678f156",

    };
    public static readonly todoApi = {
        addTodourl:"/api/v1/todo/addtodo",
        fetchTodourl: "/api/v1/todo/fetchtodo",
        deleteTodourl: "/api/v1/todo/deletetodo",
        deleteTodoId: "/629ee9c76568ba621dfb90d3",
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

    public static readonly dailyApi = {
        adddailyturl: "/api/v1/daily/adddaily",
        updatedailyurl: "/api/v1/daily/updatedaily/",
        deletedailyurl: "/api/v1/daily/deletedaily/",
        fetchdailyurl: "/api/v1/daily/fetchdaily",
        actualdailyId: "629f2b82178168afe20a6d3b",
        deletedailyId: "629f2bc2178168afe20a6f75",
        invalidailyId: "629af2f118e237aea678f16980c",
        anotherUserdailyId:"629f2b83178168afe20a6d3d",
        updatedailyId: "629f2bc2178168afe20a6f75",
        challangedailyId: "629af2f118e237aea678f16e",

    };
    public static readonly successCode = 200;
    public static readonly requestFail = 400;
    public static readonly validationFail = 422;
    public static readonly unauthorise = 401;
    public static readonly notFound = 404;
    public static readonly internalServerErr = 500;
    public static readonly redirectCode = 301;
}

