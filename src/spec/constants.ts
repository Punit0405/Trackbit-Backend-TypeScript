// {"userId":ObjectId('629ee68de6c6e036ee401a03')}
export default class Constants {
    public static readonly useremail ="szxdfcgvh@gmail.com";
    public static readonly token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU";
    public static readonly invalidtoken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOThdhdyyukiiolhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU";
    public static readonly habitApi = {
        addHabiturl: "/api/v1/habit/addhabit",
        updateHabiturl: "/api/v1/habit/updatehabit/",
        deleteHabiturl: "/api/v1/habit/deletehabit/",
        fetchHabiturl: "/api/v1/habit/fetchhabit",
        actualdeletehabitId: "629edec5d35b61e04d1bec09",
        deletehabitId: "629a023eed78fcd51d91e887",
        invalidHabitId: "629a023eed78fcd51d91e885547",
        anotherUserHabitId: "629ee730609daa4f13689047",
        updateHabitId: "629edecdd35b61e04d1bec69",
        challangeHabitId: "62a82a5f2e2b0895c7486f3e",

    };
    public static readonly todoApi = {
        addTodourl: "/api/v1/todo/addtodo",
        fetchTodourl: "/api/v1/todo/fetchtodo",
        deleteTodourl: "/api/v1/todo/deletetodo",
        completeTodourl: "/api/v1/todo/completetodo",
        updateTodoUrl:"/api/v1/todo/updatetodo/",
        deleteTodoId: "/629f32a576405b426d8f64ed",
        updateTodoId:"62a828f6b2a071bba64e2bba",
        completeTodoId: "/629f330b7bfc24ec6bf80f53",
        completeChallangeTodoId: "/62a82a5f2e2b0895c7486f40",
        deleteTodoInvalidId: "/629af2f118e237aea678f1ds",
        deleteTodoNotFound: "/629af2f118e237aea678f16c",
        deleteTodotypefalse: "/629af2f118e237aea678f162",
        deleteTodoOfOthers: "/62a82a5f2e2b0895c7486f40"
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
        actualdailyId: "629f2b83178168afe20a6d41",
        deletedailyId: "629f2bc2178168afe20a6f75",
        completeDailyId: "629f2ba7178168afe20a6e7b",
        completeChalangeDailyId: "629af2f118e237aea678f16c",
        invalidailyId: "629af2f118e237aea678f16980c",
        anotherUserdailyId: "629f2b83178168afe20a6d3d",
        updatedailyId: "629f2bc2178168afe20a6f75",
        challangedailyId: "62a82a5f2e2b0895c7486f54",

    };

    public static readonly challangeApi = {
        addchallangeurl: "/api/v1/challange/addchallange",
        updatechallangeurl: "/api/v1/challange/updatechallange/",
        deletechallangeurl:"/api/v1/challange/deletechallange/",
        updatechallangeId: "62a82a5f2e2b0895c7486f3d",
        updatechallangeInvalidId: "62a82a5f2egrf2b0895c7486f3d",
        updatechallangeNotFound: "629af2f118e237aea678f155",
        updatechallangeNotOfAccount: "62a0424c659cde11573be99b",
        actualdeletechallangeId: "62a045b61c2eea1a12d694d7",
        challangeCompletionId:"62a82a5f2e2b0895c7486f3d",
        challangeDailyId:"62a82a5f2e2b0895c7486f54",
        challangeHabitId:"",
        challangeTodoId:"62a82a5f2e2b0895c7486f40"
    };

    public static readonly successCode = 200;
    public static readonly requestFail = 400;
    public static readonly validationFail = 422;
    public static readonly unauthorise = 401;
    public static readonly notFound = 404;
    public static readonly internalServerErr = 500;
    public static readonly redirectCode = 301;
}

