import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe.skip("Update Habit", async () => {
    it("Habit update successfully", async () => {
        const response = await chai.request(app).put("/api/v1/habit/updatehabit/6299e9744b4ec8009f5c4272")
            .set("authtoken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDI1MzkyN30.Nf6jijOqCE1jB_zDSpLjLWVWCVhN6_kJ1kuW_1-KFco")
            .send({
                "title": "Sahbjnkml,;fa",
                "description": "iasfdssffedweeweffeeffewfewfew",
                "tags": ["Drinkning", "Health", "Hello"],
                "reminder": "23:10"
            });
        expect(response.status).to.be.eq(200);
    });
    it("Invalid token", async () => {
        const response = await chai.request(app).put("/api/v1/habit/updatehabit/6299e9744b4ec8009f5c4272")
            .set("authtoken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDI1MzkyN30.Nf6jijOqCE1jB_zDSqLjLWVWCVhN6_kJ1kuW_1-KFco")
            .send({
                "description": "iasfdssffedweeweffeeffewfewfew",
                "tags": ["Drinkning", "Health", "Hello"],
                "reminder": "23:10"
            });
        expect(response.status).to.be.eq(400);
    });
    it("Update without token", async () => {
        const response = await chai.request(app).put("/api/v1/habit/updatehabit/6299e9744b4ec8009f5c4272")
            .send({
                "description": "iasfdssffedweeweffeeffewfewfew",
                "tags": ["Drinkning", "Health", "Hello"],
                "reminder": "23:10"
            });
        expect(response.status).to.be.eq(400);
    });
    it("Habit of incorrect account", async () => {
        const response = await chai.request(app).put("/api/v1/habit/updatehabit/6299e9744b4ec8009f5c4212")
            .set("authtoken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDI1MzkyN30.Nf6jijOqCE1jB_zDSpLjLWVWCVhN6_kJ1kuW_1-KFco")
            .send({
                "title": "Sahbjnkml,;fa",
                "tags": ["Drinkning", "Health", "Hello"],
                "reminder": "23:10"
            });
        expect(response.status).to.be.eq(422);
    });
    it("Updating habit with incorrect habit id", async () => {
        const response = await chai.request(app).put("/api/v1/habit/updatehabit/151165")
            .set("authtoken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDI1MzkyN30.Nf6jijOqCE1jB_zDSpLjLWVWCVhN6_kJ1kuW_1-KFco")
            .send({
                "title": "Sahbjnkml,;fa",
                "tags": ["Drinkning", "Health", "Hello"],
                "reminder": "23:10"
            });
        
        expect(response.status).to.be.eq(422);
    });
});