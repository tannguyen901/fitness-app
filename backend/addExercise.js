const mongoose = require('mongoose');
const Exercise = require('./models/Exercise');

const MONGODB_URI = 'mongodb+srv://tannguyen901:dMTm94ViIUuuOuIb@fitness-app.wf2anpw.mongodb.net/fitness-app?retryWrites=true&w=majority'; // Replace with your MongoDB URI

const exerciseData = {
  Push: [],
  Pull: [],
  Legs: [],
};

const addExerciseData = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const newExerciseData = new Exercise(exerciseData);
    await newExerciseData.save();
    console.log('Exercise data added successfully!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding exercise data:', error);
  }
};

addExerciseData();
