import Daily from "../Models/Daily";
import { Response } from "express";
import User from "../Models/User";
import DailyInterface from "../interfaces/DailyInterface";
import RequestUser from "../Middlewares/RequestInterface";
import parameterValidator from "../Validations/parameterValidator";
import Challange from "../Models/Challange";
import NotificationClass from "./NotificationController";

const Notifier = new NotificationClass();
class DailyClass {
  public addDaily = async (req: RequestUser, res: Response) => {
    const {
      title,
      description,
      checklists,
      startDate,
      days,
      difficulty,
      tags,
      reminder,
    } = req.body;
    const newDaily = new Daily({
      title: title,
      description: description,
      days: days,
      completed: false,
      type: false,
      userId: req.user.id,
      startDate: startDate,
      tags: tags,
      reminder: reminder.split(" ")[0],
      difficulty: difficulty,
    });
    checklists.forEach((checklist: any) => {
      const checklistObject = {
        checklist: checklist,
        checked: false,
      };
      newDaily.checklists.push(checklistObject);
    });
    res.status(200).json({ status: true, data: "Daily Added Sucessfully" });
    return await newDaily.save();
  };
  public fetchDailys = async (req: RequestUser, res: Response) => {
    let dailies = await Daily.find({ userId: req.user.id }).select("-userId");
    dailies = dailies.filter((daily) => {
      if (!daily.completed) {
        return daily;
      }
    });

    const challangeDailys: any[] = [];
    const loggedinUser = await User.findById(req.user.id).populate({
      path: "appliedChallanges",
      populate: [
        {
          path: "habits",
          select: "-challagneId",
          model: "Habit",
        },
        { path: "todos", select: "-challagneId", model: "Todo" },
        { path: "dailies", select: "-challagneId", model: "Daily" },
      ],
    });
    if (!loggedinUser) {
      return res
        .status(401)
        .json({ status: false, data: "Loggedin User Not exists" });
    }
    loggedinUser.appliedChallanges.map((challange: any) => {
      challange.dailies.map((daily: DailyInterface) => {
        if (!daily.completedParticipants.includes(req.user.id)) {
          challangeDailys.push(daily);
        }
      });
    });

    dailies = dailies.concat(challangeDailys);
    dailies.forEach((daily: any) => {
      if (daily.type) {
        daily.checklists.forEach((checklist: any) => {
          if (checklist.checkedParticipants.includes(req.user.id)) {
            checklist.checked = true;
          } else {
            checklist.checked = false;
          }
        });
      }
    });

    return res.status(200).json({ status: true, data: dailies });
  };
  public updateDaily = async (req: RequestUser, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ status: false, data: "Please provide habit id" });
    }
    if (!parameterValidator(id)) {
      return res
        .status(400)
        .json({ status: false, data: "Please Enter a valid habit id" });
    }
    const {
      title,
      description,
      checklists,
      days,
      startDate,
      tags,
      reminder,
      difficulty,
    } = req.body;
    const daily = await Daily.findById(id);
    if (!daily) {
      return res.status(404).json({ status: false, data: "Daily not found" });
    }

    if (daily.userId.toString() !== req.user.id) {
      return res.status(400).json({
        status: false,
        data: "Daily doesn't Exists for this Account",
      });
    }
    await Daily.findByIdAndUpdate(id, { $unset: { checklists } });

    if (title) {
      daily.title = title;
    }
    if (description) {
      daily.description = description;
    }
    if (checklists) {
      checklists.forEach((checklist: any) => {
        const checklistObject = {
          checklist: checklist,
          checked: false,
        };
        daily.checklists.push(checklistObject);
      });
    }
    if (startDate) {
      daily.startDate = startDate;
    }
    if (difficulty) {
      daily.difficulty = difficulty;
    }
    if (days) {
      daily.days = days;
    }
    if (tags) {
      daily.tags = tags;
    }
    if (reminder) {
      daily.reminder = reminder.split(" ")[0];
    }
    await daily.save();
    return res.status(200).json({ status: true, data: daily });
  };
  public deleteDaily = async (req: RequestUser, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ status: false, data: "Please provide habit id" });
    }
    if (!parameterValidator(id)) {
      return res
        .status(400)
        .json({ status: false, data: "Please Enter a valid habit id" });
    }
    const daily = await Daily.findById(id);
    if (!daily) {
      return res.status(404).json({ status: false, data: "Daily Not Found" });
    }
    if (daily.type) {
      return res
        .status(400)
        .json({ status: false, data: "You cannot delete challange Daily" });
    }
    if (daily.userId.toString() !== req.user.id) {
      return res.status(400).json({
        status: false,
        data: "Daily Doesn't Exists For this Account",
      });
    }
    await Daily.findByIdAndDelete(id);
    return res.status(200).json({ status: true, data: daily });
  };

  public completeDaily = async (req: RequestUser, res: Response) => {
    let dailyId = req.params.dailyId;
    dailyId = dailyId.trim();
    if (!parameterValidator(dailyId)) {
      return res
        .status(400)
        .json({ status: false, data: "Please Enter a valid daily id" });
    }
    const daily = await Daily.findById(dailyId);
    if (!daily) {
      return res.status(404).json({ status: false, data: "Daily not found" });
    }
    if (!daily.type) {
      if (daily.userId.toString() === req.user.id) {
        daily.completed = true;
        await daily.save();
        return res
          .status(200)
          .json({ status: true, data: "Daily Completed Successfully" });
      } else {
        return res
          .status(401)
          .json({ status: false, data: "You don't own this daily." });
      }
    }
    const challange = await Challange.findById(daily.challangeId);
    if (!challange?.participants.includes(req.user.id)) {
      return res
        .status(401)
        .json({ status: false, data: "You are not in this challange" });
    }
    await Daily.findByIdAndUpdate(dailyId, {
      $push: { completedParticipants: req.user.id },
    });

    setTimeout(myFunction, 1000);
    function myFunction() {
      setTimeout(myFunction, 5000);
    }

    return res
      .status(200)
      .json({ status: true, data: "Daily Completed Marked" });
  };

  public checkDailyCheckList = async (req: RequestUser, res: Response) => {
    let { dailyid } = req.params;
    dailyid = dailyid.trim();
    let { checklistid } = req.body;
    checklistid = checklistid.trim();

    if (!dailyid) {
      return res
        .status(400)
        .json({ status: false, data: "Please Provide Todo Id" });
    }
    if (!parameterValidator(dailyid)) {
      return res
        .status(400)
        .json({ status: false, data: "Please Provide valid todo Id" });
    }
    const daily = await Daily.findById(dailyid);
    if (!daily) {
      return res.status(400).json({ status: false, data: "Todo not found" });
    }
    if (!daily.type) {
      if (daily.userId.toString() === req.user.id) {
        daily.checklists.forEach((checklist: any) => {
          if (checklist._id.toString() === checklistid) {
            if (checklist.checked) {
              checklist.checked = false;
            } else {
              checklist.checked = true;
            }
          }
        });
        daily.save();

        return res
          .status(200)
          .json({ status: true, data: "Checklist checked successfully" });
      } else {
        return res
          .status(401)
          .json({ status: false, data: "You don't own this todo." });
      }
    }
    const challange = await Challange.findById(daily.challangeId);
    if (!challange?.participants.includes(req.user.id)) {
      return res
        .status(401)
        .json({ status: false, data: "You are not in this challange" });
    }
    daily.checklists.forEach((checklist: any) => {
      if (checklist.checkedParticipants.includes(req.user.id)) {
        if (checklist._id.toString() === checklistid) {
          checklist.checkedParticipants.remove(req.user.id);
        }
      } else {
        if (checklist._id.toString() === checklistid) {
          checklist.checkedParticipants.push(req.user.id);
        }
      }
    });
    daily.save();

    return res.status(200).json({ status: true, data: "Checklist Checked" });
  };

  public dailyNotification = async () => {
    const daily = await Daily.find({ type: false }).populate({
      path: "userId",
    });
    const challangedaily = await Daily.find({ type: true }).populate({
      path: "challangeId",
      populate: {
        path: "participants",
      },
    });

    if (daily.length === 0 && challangedaily.length === 0) {
      return 0;
    }

    const notificationDaily: any[] = [];
    const notifiChallangeDaily: any[] = [];
    const daySortedDaily: any = [];
    const daySortedChallangeDaily: any = [];
    let todayDateTime: any = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const hour = Number(todayDateTime.split(" ")[1].split(":")[0]);
    const minutes = Number(todayDateTime.split(" ")[1].split(":")[1]);
    const day = new Date().toString().split(" ")[0];

    daily.forEach((daily:any) => {
      switch (day) {
        case "Mon":
          {
            if (daily.days[0]) {
              daySortedDaily.push(daily);
            }
          }
          break;
        case "Tue":
          {
            if (daily.days[1]) {
              daySortedDaily.push(daily);
            }
          }
          break;
        case "Wed":
          {
            if (daily.days[2]) {
              daySortedDaily.push(daily);
            }
          }
          break;
        case "Thu":
          if (daily.days[3]) {
            {
              daySortedDaily.push(daily);
            }
          }
          break;
        case "Fri":
          {
            if (daily.days[4]) {
              daySortedDaily.push(daily);
            }
          }
          break;
        case "Sat":
          {
            if (daily.days[5]) {
              daySortedDaily.push(daily);
            }
          }
          break;
        case "Sun":
          {
            if (daily.days[6]) {
              daySortedDaily.push(daily);
            }
          }
          break;
      }
    });
    daySortedDaily.forEach((daily:any) => {
      const dailyHour = Number(daily.reminder.split(":")[0]);
      const dailyMinutes = Number(daily.reminder.split(":")[1]);

      if (dailyHour === hour && dailyMinutes === minutes) {
        notificationDaily.push(daily);
      }
    });
    challangedaily.forEach((daily:any) => {
      switch (day) {
        case "Mon":
          {
            if (daily.days[0]) {
              daySortedChallangeDaily.push(daily);
            }
          }
          break;
        case "Tue":
          {
            if (daily.days[1]) {
              daySortedChallangeDaily.push(daily);
            }
          }
          break;
        case "Wed":
          {
            if (daily.days[2]) {
              daySortedChallangeDaily.push(daily);
            }
          }
          break;
        case "Thu":
          {
            if (daily.days[3]) {
              daySortedChallangeDaily.push(daily);
            }
          }
          break;
        case "Fri":
          {
            if (daily.days[4]) {
              daySortedChallangeDaily.push(daily);
            }
          }
          break;
        case "Sat":
          {
            if (daily.days[5]) {
              daySortedChallangeDaily.push(daily);
            }
          }
          break;
        case "Sun":
          {
            if (daily.days[6]) {
              daySortedChallangeDaily.push(daily);
            }
          }
          break;
      }
    });
    daySortedChallangeDaily.forEach((daily:any) => {
      const dailyHour = Number(daily.reminder.split(":")[0]);
      const dailyMinutes = Number(daily.reminder.split(":")[1]);
      if (dailyHour === hour && dailyMinutes === minutes) {
        notifiChallangeDaily.push(daily);
      }
    });
    if (notificationDaily.length === 0 && notifiChallangeDaily.length === 0) {
      return 0;
    }

    notificationDaily.forEach((daily:any) => {
      const registration_ids: string[] = [];
      registration_ids.push(daily.userId.deviceToken);
      Notifier.sendNotification(
        registration_ids,
        daily.userId._id,
        "Its Time To Follow Your Routine",
        daily.title
      );
    });
    notifiChallangeDaily.forEach((daily:any) => {
      const registration_ids: string[] = [];
      if (daily.challangeId.participants.length === 0) {
        return 0;
      }

      daily.challangeId.participants.forEach((participant: any) => {
        registration_ids.push(participant.deviceToken);
        Notifier.sendNotification(
          registration_ids,
          participant.toString,
          "Its Time To Follow Your challange Routine",
          daily.title
        );
      });
    });
  };
}

export default DailyClass;
