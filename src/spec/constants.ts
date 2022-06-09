// {"userId":ObjectId('629ee68de6c6e036ee401a03')}
export default class Constants {
    public static readonly useremail ="uhuvthyhymuvumo@gmail.com"
    public static readonly token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU";
    public static readonly invalidtoken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOThdhdyyukiiolhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU";
    public static readonly habitApi = {
        addHabiturl: "/api/v1/habit/addhabit",
        updateHabiturl: "/api/v1/habit/updatehabit/",
        deleteHabiturl: "/api/v1/habit/deletehabit/",
        fetchHabiturl: "/api/v1/habit/fetchhabit",
        actualdeletehabitId: "629edec5d35b61e04d1bec07",
        deletehabitId: "629a023eed78fcd51d91e887",
        invalidHabitId: "629a023eed78fcd51d91e885547",
        anotherUserHabitId: "629ee730609daa4f13689047",
        updateHabitId: "629edecdd35b61e04d1bec69",
        challangeHabitId: "629af2f118e237aea678f156",

    };
    public static readonly todoApi = {
        addTodourl: "/api/v1/todo/addtodo",
        fetchTodourl: "/api/v1/todo/fetchtodo",
        deleteTodourl: "/api/v1/todo/deletetodo",
        completeTodourl: "/api/v1/todo/completetodo",
        deleteTodoId: "/629eed4df471032a80f50c52",
        completeTodoId: "/629eea9c394e10b75ff03f1e",
        completeChallangeTodoId: "/629af2f118e237aea678f158",
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
        completedailyurl: "/api/v1/daily/completedaily/",
        deletedailyurl: "/api/v1/daily/deletedaily/",
        fetchdailyurl: "/api/v1/daily/fetchdaily",
        actualdailyId: "629f2b83178168afe20a6d3f",
        deletedailyId: "629f2bc2178168afe20a6f75",
        completeDailyId: "629f2ba7178168afe20a6e7b",
        completeChalangeDailyId: "629af2f118e237aea678f16c",
        invalidailyId: "629af2f118e237aea678f16980c",
        anotherUserdailyId: "629f2b83178168afe20a6d3d",
        updatedailyId: "629f2bc2178168afe20a6f75",
        challangedailyId: "629af2f118e237aea678f16e",

    };

    public static readonly challangeApi = {
        addchallangeurl: "/api/v1/challange/addchallange",
        updatechallangeurl: "/api/v1/challange/updatechallange/",
        updatechallangeId: "629af2f118e237aea678f155",
        updatechallangeInvalidId: "629af2f118e237aea678f15",
        updatechallangeNotFound: "6299b5ffe6ef7eec2039a2c2",
        updatechallangeNotOfAccount:"62a0424c659cde11573be99b"
    };

    public static readonly successCode = 200;
    public static readonly requestFail = 400;
    public static readonly validationFail = 422;
    public static readonly unauthorise = 401;
    public static readonly notFound = 404;
    public static readonly internalServerErr = 500;
    public static readonly redirectCode = 301;
}

