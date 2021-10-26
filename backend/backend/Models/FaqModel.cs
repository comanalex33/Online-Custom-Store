using backend.ModelRequest;

namespace backend.Models
{
    public class FaqModel
    {
        public FaqModel() { }

        public FaqModel(long _Id, FaqRequestModel _request)
        {
            Id = _Id;
            Question = _request.Question;
            Answer = _request.Answer;
        }
        public long Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
