import Habit from "../Models/Habit";
import User from "../Models/User";
import { Response } from "express";
import RequestUser from "../Middlewares/RequestInterface";
import HabitInterface from "../interfaces/HabitInterface";
import parameterValidator from "../Validations/parameterValidator";
class HabitClass {
  public addHabit = async (req: RequestUser, res: Response) => {
    try {
      const { title, description, habitType, duration, tags, reminder } =
        req.body;
        console.log(req.body,"Add Habit");
      const newHabit = new Habit({
        title: title,
        description: description,
        habitType: habitType,
        duration: duration,
        tags: tags,
        userId: req.user.id,
      });
      res.status(200).json({ status: true, data: "Habit Added Sucessfully" });
      return await newHabit.save();
    } catch (error) {
      console.log(error,"Adding Habit")
      return res
      .status(500)
        .json({ status: false, data: "Some Internal Error Occured" });
    }
  };
  public fetchHabits = async (req: RequestUser, res: Response) => {
    try {
      let habits = await Habit.find({ userId: req.user.id }).select("-userId");

      let challangeHabits: any[] = [];
      const loggedinUser = await User.findById(req.user.id).populate({
        path: "appliedChallanges",
        populate: [
          {
            path: "habits",
            model: "Habit",
          },
          { path: "todos", model: "Todo" },
          { path: "dailies", model: "Daily" },
        ],
      });
      if (!loggedinUser) {
        return res
          .status(401)
          .json({ status: false, data: "Loggedin User Not exists" });
      }
      loggedinUser.appliedChallanges.map((challange: any) => {
        challange.habits.map((habit: HabitInterface) => {
          challangeHabits.push(habit);
        });
      });

      habits = habits.concat(challangeHabits);

      return res.status(200).json({ status: true, data: habits });
    } catch (error) {
      console.log(error,"Fetching Habit")
      return res
      .status(500)
        .json({ status: false, data: "Some Internal Server Occured" });
    }
  };
  public updateHabit = async (req: RequestUser, res: Response) => {
    try {
      let { id } = req.params;
      id = id.trim();
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

      const { title, description, habitType, duration, tags, reminder } =
        req.body;
       
      const habit = await Habit.findById(id);
      if (!habit) {
        return res.status(404).json({ status: false, data: "Habit not found" });
      }

      if (habit.userId.toString() !== req.user.id) {
        return res
        .status(400)
          .json({
            status: false,
            data: "Habit doesn't Exists for this Account",
          });
      }

      if (title) {
        habit.title = title;
      }
      if (description) {
        habit.description = description;
      }
      if (habitType) {
        habit.habitType = habitType;
      }
      if (duration) {
        habit.duration = duration;
      }
      if (tags) {
        habit.tags = tags;
      }
      if (reminder) {
        habit.reminder = reminder;
      }
      await habit.save();
      return res.status(200).json({ status: true, data: habit });
    } catch (error) {
      console.log(error,"Updating Habit")
      return res
      .status(500)
        .json({ status: false, data: "Some Internal Server Occured" });
    }
  };
  public deleteHabit = async (req: RequestUser, res: Response) => {
    try {
      const { id } = req.params;
      if(!id){

        return res.status(404).json({status:false,data:"Please provide habit id"})
      }
      if (!parameterValidator(id)) {
        return res
          .status(400)
          .json({ status: false, data: "Please Enter a valid habit id" });
      }
      const habit = await Habit.findById(id);
      if (!habit) {
        return res.status(404).json({ status: false, data: "Habit Not Found" });
      }
      if (habit.userId.toString() !== req.user.id) {
        return res
          .status(400)
          .json({
            status: false,
            data: "Habit Doesn't Exists For this Account",
          });
      }
      await Habit.findByIdAndDelete(id);
      return res.status(200).json({ status: true, data: habit });
    } catch (error) {
      console.log(error,"Deleting Habit")
      return res
      .status(500)
      .json({ status: false, data: "Some Internal Error Occured" });
    }
  };
}
export default HabitClass;
