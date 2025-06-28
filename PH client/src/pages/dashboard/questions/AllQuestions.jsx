/* eslint-disable no-unused-vars */
import { useState } from "react"
import { ChevronRight } from "lucide-react"

// Define question types and their categories
const questionCategories = [
  {
    name: "Speaking",
    color: "#F2994A", // Orange/yellow color
    textColor: "#F2994A",
    questions: [
      { id: "read-aloud", title: "Read Aloud", icon: "🗣️", url:"/question/read-aloud" },
      { id: "repeat-sentence", title: "Repeat Sentence", icon: "🗣️", url:"/question/repeat-sentence"},
      { id: "respond-situation", title: "Respond to a Situation", icon: "🗣️" },
      { id: "answer-short", title: "Answer Short Question", icon: "🗣️" },
    ],
  },
  {
    name: "Writing",
    color: "#2D9CDB", // Blue color
    textColor: "#2D9CDB",
    questions: [
      { id: "summarize-written", title: "Summarize Written Text", icon: "✍️" },
      { id: "write-email", title: "Write Email", icon: "✍️" },
    ],
  },
  {
    name: "Reading",
    color: "#27AE60", // Green color
    textColor: "#27AE60",
    questions: [
      { id: "fill-blanks-reading", title: "Fill in the Blanks", icon: "📚" },
      { id: "multiple-choice-reading", title: "Multiple Choice and ans...", icon: "📚" },
      { id: "reorder-paragraphs", title: "Re-order Paragraphs", icon: "📚" },
      { id: "multiple-choice-single-reading", title: "Multiple Choice, Single A...", icon: "📚" },
    ],
  },
  {
    name: "Listening",
    color: "#6666CC", // Purple color
    textColor: "#6666CC",
    questions: [
      { id: "summarize-spoken", title: "Summarize Spoken Text", icon: "🎧" },
      { id: "multiple-choice-listening", title: "Multiple Choice and ans...", icon: "🎧" },
      { id: "fill-blanks-listening", title: "Fill in the blanks", icon: "🎧" },
      { id: "multiple-choice-single-listening", title: "Multiple Choice, Single A...", icon: "🎧" },
    ],
  },
]

export default function AllQuestions() {

  // Function to handle question button click and redirect to the corresponding URL
  const handleQuestionClick = (questionUrl) => {
    window.location.href = questionUrl;  // Using href for redirect instead of window.location
  }

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="bg-[#8B0000] text-white p-4">
        <h1 className="text-2xl font-bold">Question</h1>
      </div>

      {/* Question categories and buttons */}
      <div className="bg-white p-4">
        {/* Category tabs */}
        <div className="flex mb-4">
          {questionCategories.map((category) => (
            <div
              key={category.name}
              className="flex-1 pb-1 text-center"
              style={{ borderBottom: `2px solid ${category.color}` }}
            >
              <span style={{ color: category.textColor }} className="font-medium">
                {category.name}
              </span>
            </div>
          ))}
        </div>

        {/* Question buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {questionCategories.map((category) => (
            <div key={category.name} className="flex flex-col gap-3">
              {category.questions.map((question) => (
                <button
                  key={question.id}
                  onClick={() => handleQuestionClick(question.url)}
                  className={`flex items-center justify-between p-3 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors`}
                  style={{ borderColor: category.color }}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{question.icon}</span>
                    <span>{question.title}</span>
                  </div>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
