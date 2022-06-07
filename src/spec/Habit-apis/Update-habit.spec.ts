import app from "../appfile.spec";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import constants from "../constants";

chai.should();
chai.use(chaiHttp);

describe("Update Habit", async () => {
    it("Habit update successfully", async () => {
        const response = await chai
            .request(app)
            .put(constants.habitApi.updateHabiturl + constants.habitApi.updateHabitId)
            .set(
                "authtoken",
                constants.token
            )
            .send({
                title: "Sahbjnkml,;fa",
                description: "iasfdssffedweeweffeeffewfewfew",
                tags: ["Drinkning", "Health", "Hello"],
                reminder: "23:10",
            });
        expect(response.status).to.be.eq(constants.successCode);
    });
    it("Habit update with title of less than 6", async () => {
        const response = await chai
            .request(app)
            .put(constants.habitApi.updateHabiturl + constants.habitApi.updateHabitId)
            .set(
                "authtoken",
                constants.token
            )
            .send({
                title: "Sah",
                description: "iasfdssffedweeweffeeffewfewfew",
                tags: ["Drinkning", "Health", "Hello"],
                reminder: "23:10",
            });
        expect(response.status).to.be.eq(constants.validationFail);
    });
    it("Habit update with title lesethan 6 characters ", async () => {
        const response = await chai
            .request(app)
            .put(constants.habitApi.updateHabiturl + constants.habitApi.updateHabitId)
            .set(
                "authtoken",
                constants.token
            )
            .send({
                title: "Sahbjnkml,;fa",
                description: "ias",
                tags: ["Drinkning", "Health", "Hello"],
                reminder: "23:10",
            });
        expect(response.status).to.be.eq(constants.validationFail);
    });
    it("Updating Habit with Invalid token", async () => {
        const response = await chai
            .request(app)
            .put(constants.habitApi.updateHabiturl + constants.habitApi.updateHabitId)
            .set(
                "authtoken",
                constants.invalidtoken
            )
            .send({
                description: "iasfdssffedweeweffeeffewfewfew",
                tags: ["Drinkning", "Health", "Hello"],
                reminder: "23:10",
            });
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Update without token", async () => {
        const response = await chai
            .request(app)
            .put(constants.habitApi.updateHabiturl + constants.habitApi.updateHabitId)
            .send({
                description: "iasfdssffedweeweffeeffewfewfew",
                tags: ["Drinkning", "Health", "Hello"],
                reminder: "23:10",
            });
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Habit of incorrect account", async () => {
        const response = await chai
            .request(app)
            .put(constants.habitApi.updateHabiturl + constants.habitApi.anotherUserHabitId)
            .set(
                "authtoken",
                constants.token
            )
            .send({
                title: "Sahbjnkml,;fa",
                description:"jbg iubguuteu gyuwgtegtyhw oghtwgh",
                tags: ["Drinkning", "Health", "Hello"],
                reminder: "23:10",
            });
        expect(response.status).to.be.eq(constants.requestFail);
    });
    it("Updating habit with incorrect habit id", async () => {
        const response = await chai
            .request(app)
            .put(constants.habitApi.updateHabiturl + constants.habitApi.invalidHabitId)
            .set(
                "authtoken",
                constants.token
            )
            .send({
                title: "Sahbjnkml,;fa",
                description:"djfi guiruigeuihguietpghp",
                tags: ["Drinkning", "Health", "Hello"],
                reminder: "23:10",
            });

        expect(response.status).to.be.eq(constants.requestFail);
    });
});
