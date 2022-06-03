import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe.skip("Decrease User Experience", async () => {
    it("Successfully Increasing", async () => {
        const response = await chai.request(app).post("/api/v1/user/decreaseUserHealth")
            .set("authtoken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDI0MDA4OH0.sDAYpIpoOXgo26HeAi-DvvxRPTtfUBefamDbd68fnQE")
            .send({
                "health": 50
            });
        expect(response.status).to.be.eq(200);
    });
    it("Decreasing Experience without body", async () => {
        const response = await chai.request(app).post("/api/v1/user/decreaseUserHealth")
            .set("authtoken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDI0MDA4OH0.sDAYpIpoOXgo26HeAi-DvvxRPTtfUBefamDbd68fnQE")
            .send({});
        expect(response.status).to.be.eq(400);
    });
});