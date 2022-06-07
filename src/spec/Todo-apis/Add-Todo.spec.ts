import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("Add Todo", async () => {
    it("Adding Habit  with all the parameters with token", async () => {
        const response = await chai
            .request(app)
            .post("/api/v1/todo/addtodo")
            .set(
                "authtoken",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU"
            )
            .send({
                "title":"Trackbit",
                "description":"Todo From Trackbi",
                "dueDate":"2022-05-20",
                "reminderDate":"2022-05-10",
                "reminderTime":"10:05",
                "tags":["Groceries","Home"],
                "difficulty":[false,true,false],
                "checklists":["Rice","Pulse","Chocolates","Sugar"]
            });
        expect(response.status).to.be.eq(200);
    });
    it("Adding Habit with all the parameters with invalidtoken", async () => {
        const response = await chai
            .request(app)
            .post("/api/v1/todo/addtodo")
            .set(
                "authtoken",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZdnfuhfuyTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU"
            )
            .send({
                "title":"Trackbit",
                "descr200iption":"Todo From Trackbi",
                "dueDate":"2022-05-20",
                "reminderDate":"2022-05-10",
                "reminderTime":"10:05",
                "tags":["Groceries","Home"],
                "difficulty":[false,true,false],
                "checklists":["Rice","Pulse","Chocolates","Sugar"]
            });
        expect(response.status).to.be.eq(400);
    });
    it("Adding Habit with all the parameters without token", async () => {
        const response = await chai
            .request(app)
            .post("/api/v1/todo/addtodo")
            .send({
                "title":"Trackbit",
                "description":"Todo From Trackbi",
                "dueDate":"2022-05-20",
                "reminderDate":"2022-05-10",
                "reminderTime":"10:05",
                "tags":["Groceries","Home"],
                "difficulty":[false,true,false],
                "checklists":["Rice","Pulse","Chocolates","Sugar"]
            });
        expect(response.status).to.be.eq(400);
    });
    it("Adding Habit without title and description all the parameters with token", async () => {
        const response = await chai
            .request(app)
            .post("/api/v1/todo/addtodo")
            .set(
                "authtoken",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU"
            )
            .send({
                "dueDate":"2022-05-20",
                "reminderDate":"2022-05-10",
                "reminderTime":"10:05",
                "tags":["Groceries","Home"],
                "difficulty":[false,true,false],
                "checklists":["Rice","Pulse","Chocolates","Sugar"]
            });
        expect(response.status).to.be.eq(422);
    });
    it("Adding Habit without description all the parameters with token", async () => {
        const response = await chai
            .request(app)
            .post("/api/v1/todo/addtodo")
            .set(
                "authtoken",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU"
            )
            .send({
                "title":"Trackbit",
                "dueDate":"2022-05-20",
                "reminderDate":"2022-05-10",
                "reminderTime":"10:05",
                "tags":["Groceries","Home"],
                "difficulty":[false,true,false],
                "checklists":["Rice","Pulse","Chocolates","Sugar"]
            });
        expect(response.status).to.be.eq(422);
    });
    it("Adding Habit without title the parameters with token", async () => {
        const response = await chai
            .request(app)
            .post("/api/v1/todo/addtodo")
            .set(
                "authtoken",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhZTY4NDFjYWEzMGFhOWFjODVhNyIsImVtYWlsIjoicHVuaXQudGV3YW5pLnNhQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzODg2OH0.C2tX0ZwOBbPWhQK_AsfOlijhtXkUdV8JYMS8AflXmFU"
            )
            .send({
                "description":"Todo From Trackbi",
                "dueDate":"2022-05-20",
                "reminderDate":"2022-05-10",
                "reminderTime":"10:05",
                "tags":["Groceries","Home"],
                "difficulty":[false,true,false],
                "checklists":["Rice","Pulse","Chocolates","Sugar"]
            });
        expect(response.status).to.be.eq(422);
    });

});
