import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe.skip("User-Registraion", () => {
    it("Get Levels For User with token", async () => {
        const response = await chai.request(app).get("/api/v1/user/fetchuserlevels")
            .set("authtoken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDI0MDA4OH0.sDAYpIpoOXgo26HeAi-DvvxRPTtfUBefamDbd68fnQE");
        expect(response.status).to.be.eq(200);
    });
    it("Get Levels For User without token", async () => {
        const response = await chai.request(app).get("/api/v1/user/fetchuserlevels");
        expect(response.status).to.be.eq(400);
    });
});