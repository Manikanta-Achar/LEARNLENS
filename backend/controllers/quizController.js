import QuizModel from "../models/quizModel.js";
import MaterialModel from "../models/materialModel.js";
import QuizResultModel from "../models/quizResultModel.js";
import { generateQuizQuestions } from "../services/aiService.js";

//generate the quiz
export const generateQuiz = async (req, res) => {
  try {
    const { materialId, topics, questionCount } = req.body;

    if (!materialId || !topics || topics.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Material ID and topics are required",
      });
    }

    const material = await MaterialModel.findOne({
      _id: materialId,
      userId: req.user._id,
    });

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    const questions = await generateQuizQuestions(
      material.content,
      topics,
      questionCount,
    );

    const quiz = await QuizModel.create({
      userId: req.user._id,
      materialId,
      questions,
    });

    res.status(201).json({
      success: true,
      message: "Quiz generated successfully",
      quiz,
    });
  } catch (error) {
    console.error("Generate quiz error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to generate quiz",
    });
  }
};

//Submit Quiz
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId || !answers) {
      return res.status(400).json({
        success: false,
        message: "Quiz ID and answers are required",
      });
    }

    const quiz = await QuizModel.findOne({
      _id: quizId,
      userId: req.user._id,
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    let correctAnswers = 0;

    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correctAnswers++;
      }
    });

    const totalQuestions = quiz.questions.length;
    const wrongAnswers = totalQuestions - correctAnswers;

    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const result = await QuizResultModel.create({
      userId: req.user._id,
      quizId,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      score,
    });

    res.status(201).json({
      success: true,
      message: "Quiz submitted successfully",
      result,
    });
  } catch (error) {
    console.error("Submit quiz error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to submit quiz",
    });
  }
};

//Quiz Res
export const getQuizResult = async (req, res) => {
  try {
    const { quizId } = req.params;

    const result = await QuizResultModel.findOne({
      quizId,
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Quiz result not found",
      });
    }

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Get quiz result error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get quiz result",
    });
  }
};
