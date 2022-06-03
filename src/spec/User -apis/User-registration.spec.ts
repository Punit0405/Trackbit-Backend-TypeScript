import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe.skip("User-Registraion", () => {
    it("New User Register with All parameters", async () => {
        console.log("Hello");
        const response = await chai.request(app).post("/api/v1/user/userregister").send({
            "name": "Punit Tewani",
            "email": "keta.sarang.sa@gmail.com",
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(200);


    }),
    it("Addng already registerd user", async () => {
        const response = await chai.request(app).post("/api/v1/user/userregister").send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(400);

    }),
    it("Adding User without Email Parameter", async () => {
        const response = await chai.request(app).post("/api/v1/user/userregister").send({
            "name": "Punit Tewani",
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(422);

    }),
    it("Adding User without name ", async () => {
        const response = await chai.request(app).post("/api/v1/user/userregister").send({

            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(422);

    }),
    it("Adding user without password", async () => {
        const response = await chai.request(app).post("/api/v1/user/userregister").send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(422);

    }),
    it("Adding user without confirm password", async () => {
        const response = await chai.request(app).post("/api/v1/user/userregister").send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit@92655"

        });
        expect(response.status).to.be.eq(400);

    }),
    it("Adding user with diffrent passwords", async () => {
        const response = await chai.request(app).post("/api/v1/user/userregister").send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit@92655",
            "confirmpassword": "Punit@98243"

        });
        expect(response.status).to.be.eq(400);

    }),
    it("Adding user with less than 3 characters in name", async () => {
        const response = await chai.request(app).post("/api/v1/user/userregister").send({
            "name": "Pu",
            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(422);

    }),
    it("Adding user with invalid email id", async () => {
        const response = await chai.request(app).post("/api/v1/user/userregister").send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sagmail.com",
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(422);

    }),
    it("Adding user with password less than 6 characters", async () => {
        const response = await chai.request(app).post("/api/v1/user/userregister").send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit",
            "confirmpassword": "Punit"

        });
        expect(response.status).to.be.eq(400);

    }),
    it("Adding user with less than 6 characters and diffrent confirm password", async () => {
        const response = await chai.request(app).post("/api/v1/user/userregister").send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(400);

    });

});