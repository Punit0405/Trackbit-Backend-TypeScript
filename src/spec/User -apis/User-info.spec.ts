import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe.skip("User-Login", () => {
    it("Getting User-Info with Auth-Token", async () => {
        const response = await chai.request(app)
            .get("/api/v1/user/fetchuser")
            .set("authtoken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU");
        expect(response).to.have.status(200);
    });
    it("Getting User-Info without Auth-Token", async () => {
        const response = await chai.request(app)
            .get("/api/v1/user/fetchuser")
            .set({ authToken: "" });
        console.log(response);
        expect(response).to.have.status(400);
    });
});