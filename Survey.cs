using System;
using System.Collections.Generic;

namespace ReactJsSurveyProjectApplication
{
    public class Survey
    {
        public int Id { get; set; }
        public string SurveyName { get; set; }
        public List<Question> Questions { get; set; }
    }
}
