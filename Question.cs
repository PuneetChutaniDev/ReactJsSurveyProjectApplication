using System;

namespace ReactJsSurveyProjectApplication
{
    public class Question
    {
        public int Id { get; set; }

        public int SurveyId { get; set; }

        public string SurveyName { get; set; }

        public string Ques { get; set; }

        public int TotalAnswers { get; set; }
    }
}
