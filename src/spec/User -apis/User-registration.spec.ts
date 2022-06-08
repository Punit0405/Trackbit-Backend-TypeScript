import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("User-Registraion", () => {
    it("New User Register with All parameters", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani",
            "email": "hhuthuhdftuthyyuuirehuin.sa@gmail.com",
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.successCode);


    }),
    it("Addng already registerd user", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.requestFail);

    }),
    it("Adding User without Email Parameter", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani",
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(422);

    }),
    it("Adding User without Email without confirm Parameter", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani",
            "password": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding User without Email and password Parameter", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),

    it("Adding User without Email and name Parameter", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding User without name ", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({

            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding User without name and confirm password ", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({

            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit@92655",

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding User without name and password", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({

            "email": "punit.tewani.sa@gmail.com",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding user without password", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding user with only password", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "password": "Punit@92655",

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding user with only confirm password", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding user without password and confirm password", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding user with only name", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani"
        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding user with only email", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "email": "punit.tewani.sa@gmail.com",

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding user without confirm password", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.requestFail);

    }),
    it("Adding user with diffrent passwords", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit@92655",
            "confirmpassword": "Punit@98243"

        });
        expect(response.status).to.be.eq(constants.requestFail);

    }),
    it("Adding user with less than 3 characters in name", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Pu",
            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding user with invalid email id", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sagmail.com",
            "password": "Punit@92655",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding user with password less than 6 characters", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit",
            "confirmpassword": "Punit"

        });
        expect(response.status).to.be.eq(constants.validationFail);

    }),
    it("Adding user with less than 6 characters and diffrent confirm password", async () => {
        const response = await chai.request(app).post(constants.userApi.userRegistration).send({
            "name": "Punit Tewani",
            "email": "punit.tewani.sa@gmail.com",
            "password": "Punit",
            "confirmpassword": "Punit@92655"

        });
        expect(response.status).to.be.eq(constants.validationFail);

    });

});