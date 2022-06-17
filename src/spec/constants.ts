// {"userId":ObjectId('629ee68de6c6e036ee401a03')}
export default class Constants {
    public static readonly useremail ="szsfwesvh@gmail.com";
    public static readonly token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU";
    public static readonly invalidtoken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOThdhdyyukiiolhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU";
    public static readonly habitApi = {
        addHabiturl: "/api/v1/habit/addhabit",
        updateHabiturl: "/api/v1/habit/updatehabit/",
        deleteHabiturl: "/api/v1/habit/deletehabit/",
        fetchHabiturl: "/api/v1/habit/fetchhabit",
        actualdeletehabitId: "629edec6d35b61e04d1bec0b",
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
        deleteTodoId: "/629f449c5f6a8c941c0ab11d",
        updateTodoId:"62a828f6b2a071bba64e2bba",
        completeTodoId: "/629f4d18ddf0a7f890a7e70e",
        completeChallangeTodoId: "/62a82a432e2b0895c7486727",
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
        actualdailyId: "629f2b83178168afe20a6d43",
        deletedailyId: "629f2bc2178168afe20a6f75",
        completeDailyId: "629f2b83178168afe20a6d45",
        completeChalangeDailyId: "62a82a422e2b0895c748670a",
        invalidailyId: "629af2f118e237aea678f16980c",
        anotherUserdailyId: "629f2b83178168afe20a6d3d",
        updatedailyId: "629f2bc2178168afe20a6f75",
        challangedailyId: "62a82a5f2e2b0895c7486f54",

    };

    public static readonly challangeApi = {
        addchallangeurl: "/api/v1/challange/addchallange",
        updatechallangeurl: "/api/v1/challange/updatechallange/",
        deletechallangeurl:"/api/v1/challange/deletechallange/",
        fetchchallangeurl:"/api/v1/challange/fetchchallange/",
        fetchallchallangesUrl:"/api/v1/challange/fetchallchallanges/",
        showparticipantsUrl:"/api/v1/challange/showparticipants/",
        joinedChallagneUrl:"/api/v1/challange/joinedchallange/",
        joinChallagneUrl:"/api/v1/challange/joinchallange/",
        leaveChallagneUrl:"/api/v1/challange/leavechallange/",
        isjoinedUrl:"/api/v1/challange/ischallangejoined/",
        updateChallangeHabitUrl:"/api/v1/challange/updatechallangehabit/",
        updateChallangeTodoUrl:"/api/v1/challange/updatechallangetodo/",
        updateChallangeDailyUrl:"/api/v1/challange/updatechallangedaily/",
        joinChallangeId:"62a82a5f2e2b0895c7486f3d",
        leaveChallangeId:"62a82a5f2e2b0895c7486f3d",
        updatechallangeId: "62a82a5f2e2b0895c7486f3d",
        joinedId: "62a82a432e2b0895c7486715",
        updateChallangeHabitId:"62a82a672e2b0895c7486f86",
        updateChallangeTodoId:"62a82a672e2b0895c7486f88",
        updateChallangeDailyId:"62a82a672e2b0895c7486f9d",
        updatechallangeInvalidId: "62a82a5f2egrf2b0895c7486f3d",
        updatechallangeNotFound: "629af2f118e237aea678f155",
        updatechallangeNotOfAccount: "62a0424c659cde11573be99b",
        showparticipantsid: "62a82a432e2b0895c7486715",
        actualdeletechallangeId: "62a0465efdaa6d7d6a02f4c3",
        challangeCompletionId:"62a82a5f2e2b0895c7486f3d",
        challangeDailyId:"62a82a5f2e2b0895c7486f54",
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

