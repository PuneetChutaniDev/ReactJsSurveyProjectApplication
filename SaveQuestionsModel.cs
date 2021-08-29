using System;

namespace ReactJsSurveyProjectApplication
{
    public class SaveQuestionsModel
    {
        public int SurveyId { get; set; }
        public string SurveyName { get; set; }
        public int QuestionId { get; set; }
        public string Question { get; set; }
        public int TotalAnswers { get; set; }
    }
}
