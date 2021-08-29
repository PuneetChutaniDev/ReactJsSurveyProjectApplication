using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactJsSurveyProjectApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SurveyController : ControllerBase
    {
        private readonly ILogger<SurveyController> _logger;
        private static List<Survey> _surveys;
        private static List<Question> _questions;
        public SurveyController(ILogger<SurveyController> logger)
        {
            _logger = logger;

            if (_surveys == null)
            {
                _surveys = new List<Survey>();
            }
            if (_questions == null)
            {
                _questions = new List<Question>();
            }
        }

        [HttpPost]
        [Route("SaveSurvey")]
        public bool SaveSurvey([FromBody] Survey survey)
        {
            if (survey.Id == 0 || survey.SurveyName.Equals(string.Empty))
            {
                return false;
            }

            _surveys.Add(new Survey
            {
                Id = survey.Id,
                SurveyName = survey.SurveyName
            });

            return true;
        }

        [HttpPost]
        [Route("SaveQuestion")]
        public bool SaveQuestion([FromBody] Question question)
        {
            var survey = _surveys.FirstOrDefault(x => x.SurveyName.ToLower().Equals(question.SurveyName.ToLower()));
            if (survey==null)
                return false;

            var id = GetQuestionId(survey.Id);
            if (id > 4)
            {
                return false;
            }

            _questions.Add(new Question
            {
                Id = id,
                SurveyId = survey.Id,
                SurveyName = question.SurveyName,
                Ques = question.Ques,
                TotalAnswers = question.TotalAnswers
            });

            return true;
        }

        [HttpGet]
        [Route("GetAllSurveys")]
        public List<Survey> GetListOfSurveys()
        {
            return _surveys;
        }

        [HttpGet]
        [Route("GetAllQuestions")]
        public List<Question> GetAllQuestions()
        {
            return _questions;
        }


        [HttpGet]
        [Route("GetSurveyId")]
        public int GetSurveyId()
        {
            int i = 0;
            if (_surveys.Count == 0)
            {
                return ++i;
            }

            i = _surveys.Select(x => x.Id).Max();
            return ++i;
        }

        [HttpDelete]
        public bool DeleteSurvey(int surveyId)
        {
            if (_surveys.Count == 1)
            {
                return false;
            }

            var survey = _surveys.FirstOrDefault(x => x.Id == surveyId);
            if (survey != null)
            {
                _surveys.Remove(survey);
            }

            return true;
        }

        [HttpGet]
        public IEnumerable<Survey> ListOfSurveys()
        {
            var questions1 = new List<Question> {
                new Question{ Id = 1, Ques = "What is your Address?", TotalAnswers = 1 },
                new Question{ Id = 2, Ques = "What is your phone number?", TotalAnswers = 2 },
                new Question{ Id = 3, Ques = "What is your hobby?", TotalAnswers = 3 },
            };

            var questions2 = new List<Question> {
                new Question{ Id = 1, Ques = "?", TotalAnswers = 1 },
                new Question{ Id = 2, Ques = "What is your phone number?", TotalAnswers = 2 },
                new Question{ Id = 3, Ques = "What is your hobby?", TotalAnswers = 3 },
            };

            return new List<Survey> {
                new Survey{ Id = 1, Questions = questions1, SurveyName = "employee survey" },
                new Survey{ Id = 2, Questions = questions1, SurveyName = "employee survey" },
            };
        }

        public int GetQuestionId(int surveyId)
        {
            int id = 0;
            if (_questions.Count==0 || !_questions.Where(x => x.SurveyId == surveyId).Any())
            {
               return ++id;
            }

            var i = _questions.Where(x => x.SurveyId == surveyId)?.Select(x=>x.Id).Max();
            var val =  i ??  id ;
            return ++val;
        }

    }
}
