import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const WeightSettings = new Mongo.Collection("weightSettings");

const PowerbbSchema = new SimpleSchema({
  workoutWeek: {
    type: String,
    defaultValue: "Week 1 Phase 1"
  }
});

const FiveThreeOneSchema = new SimpleSchema({
  workoutWeek: {
    type: String,
    defaultValue: "5 / 5 / 5"
  },
  closeGripBenchMax: {
    type: SimpleSchema.Integer,
    defaultValue: 0
  },
  sumoDeadliftMax: {
    type: SimpleSchema.Integer,
    defaultValue: 0
  },
  inclineBenchMax: {
    type: SimpleSchema.Integer,
    defaultValue: 0
  },
  frontSquatMax: {
    type: SimpleSchema.Integer,
    defaultValue: 0
  }
});

const WeightSettingsSchema = new SimpleSchema({
  user: {
    type: String,
    required: false
  },
  overheadMax: {
    type: SimpleSchema.Integer,
    defaultValue: 0
  },
  squatMax: {
    type: SimpleSchema.Integer,
    defaultValue: 0
  },
  benchMax: {
    type: SimpleSchema.Integer,
    defaultValue: 0
  },
  deadliftMax: {
    type: SimpleSchema.Integer,
    defaultValue: 0
  },
  lastUpdated: {
    type: Date,
    defaultValue: new Date()
  },
  powerbb: {
    type: PowerbbSchema,
    required: false
  },
  fivethreeone: {
    type: FiveThreeOneSchema,
    required: false
  }
});

WeightSettings.attachSchema(WeightSettingsSchema);

if (Meteor.isServer) {
  Meteor.publish("allWeights", function() {
    return WeightSettings.find({ user: Meteor.userId() });
  });

  Meteor.methods({
    /*
    -------------------------------------------METHODS FOR POWER BB 
    */

    /*
    insert maxes
    */
    insertRepMaxes(overheadMax, benchMax, squatMax, deadliftMax, userid) {
      let id;
      if (Meteor.user()) {
        id = WeightSettings.insert({
          user: userid,
          overheadMax,
          benchMax,
          squatMax,
          deadliftMax,
          lastUpdated: new Date()
        });
      } else if (!Meteor.user()) {
        id = WeightSettings.insert({
          overheadMax,
          benchMax,
          squatMax,
          deadliftMax,
          lastUpdated: new Date()
        });
      }
      return id;
    },

    updateRepMaxForUser(overheadMax, benchMax, squatMax, deadliftMax, userid) {
      WeightSettings.update(
        { user: userid },
        {
          $set: {
            overheadMax,
            benchMax,
            squatMax,
            deadliftMax,
            lastUpdated: new Date()
          }
        }
      );
    },

    updateRepMaxLocalStorage(
      overheadMax,
      benchMax,
      squatMax,
      deadliftMax,
      weightSettingsId
    ) {
      WeightSettings.update(
        { _id: weightSettingsId },
        {
          $set: {
            overheadMax,
            benchMax,
            squatMax,
            deadliftMax,
            lastUpdated: new Date()
          }
        }
      );
    },

    /*
    Week of Powerbb program 
    */

    insertWeekOfProgramPowerbb(week, userId) {
      let id;
      if (Meteor.user()) {
        id = WeightSettings.insert({
          user: userId,
          powerbb: { workoutWeek: week },
          lastUpdated: new Date()
        });
      } else if (!Meteor.user()) {
        id = WeightSettings.insert({
          powerbb: { workoutWeek: week },
          lastUpdated: new Date()
        });
      }
      return id;
    },

    updateWeekOfUser(week, userId) {
      WeightSettings.update(
        { user: userId },
        {
          $set: {
            powerbb: { workoutWeek: week },
            lastUpdated: new Date()
          }
        }
      );
    },

    updateWeekOfStorage(week, weightSettingsId) {
      WeightSettings.update(
        { _id: weightSettingsId },
        {
          $set: {
            powerbb: { workoutWeek: week },
            lastUpdated: new Date()
          }
        }
      );
    },

    /*
    --------------------------------------------METHODS FOR 5/3/1
    */

    /*
    insert secondary maxes for 5/3/1 program 
    */

    insertSecondaryMaxes(
      frontSquatMax,
      closeGripBenchMax,
      sumoDeadliftMax,
      inclineBenchMax,
      userid
    ) {
      let id;
      if (Meteor.user()) {
        id = WeightSettings.insert({
          user: userid,
          fivethreeone: {
            frontSquatMax,
            closeGripBenchMax,
            sumoDeadliftMax,
            inclineBenchMax
          },
          lastUpdated: new Date()
        });
      } else if (!Meteor.user()) {
        id = WeightSettings.insert({
          fivethreeone: {
            frontSquatMax,
            closeGripBenchMax,
            sumoDeadliftMax,
            inclineBenchMax
          },
          lastUpdated: new Date()
        });
      }
      return id;
    },

    updateSecondaryMaxForUser(
      frontSquatMax,
      closeGripBenchMax,
      sumoDeadliftMax,
      inclineBenchMax,
      userid
    ) {
      WeightSettings.update(
        { user: userid },
        {
          $set: {
            fivethreeone: {
              frontSquatMax,
              closeGripBenchMax,
              sumoDeadliftMax,
              inclineBenchMax
            },
            lastUpdated: new Date()
          }
        }
      );
    },

    updateSecondaryMaxLocalStorage(
      frontSquatMax,
      closeGripBenchMax,
      sumoDeadliftMax,
      inclineBenchMax,
      weightSettingsId
    ) {
      WeightSettings.update(
        { _id: weightSettingsId },
        {
          $set: {
            fivethreeone: {
              frontSquatMax,
              closeGripBenchMax,
              sumoDeadliftMax,
              inclineBenchMax
            },
            lastUpdated: new Date()
          }
        }
      );
    },

    /*
    Week of 5/3/1 program 
    */

    insertWeekOfProgramFiveThreeOne(week, userId) {
      let id;
      if (Meteor.user()) {
        id = WeightSettings.insert({
          user: userId,
          fivethreeone: { workoutWeek: week },
          lastUpdated: new Date()
        });
      } else if (!Meteor.user()) {
        id = WeightSettings.insert({
          fivethreeone: { workoutWeek: week },
          lastUpdated: new Date()
        });
      }
      return id;
    },

    updateWeekOfUserFiveThreeOne(week, userId) {
      WeightSettings.update(
        { user: userId },
        {
          $set: {
            fivethreeone: { workoutWeek: week },
            lastUpdated: new Date()
          }
        }
      );
    },

    updateWeekOfStorageFiveThreeOne(week, weightSettingsId) {
      WeightSettings.update(
        { _id: weightSettingsId },
        {
          $set: {
            fivethreeone: { workoutWeek: week },
            lastUpdated: new Date()
          }
        }
      );
    }
  });
}
