var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');
var dialogs = require("ui/dialogs");

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.Questions = new ObservableArray([]);
    viewModel.Person = new ObservableArray([]);

    //Text input
    viewModel.studyID = "";
    viewModel.facility = "";
    viewModel.emr = "";
    viewModel.position = "";
    viewModel.edu = "";
    viewModel.gender = "";
    viewModel.age = "";

    //EMR observable arrays
    viewModel.QuestionsPaper = new ObservableArray([]);
    viewModel.QuestionsAgree = new ObservableArray([]);
    viewModel.QuestionsPa = new ObservableArray([]);
    viewModel.QuestionsNeutral = new ObservableArray([]);
    viewModel.QuestionsPd = new ObservableArray([]);
    viewModel.QuestionsDisagree = new ObservableArray([]);

    //Paper observable arrays
    viewModel.QuestionsAgreePaper = new ObservableArray([]);
    viewModel.QuestionsPaPaper = new ObservableArray([]);
    viewModel.QuestionsNeutralPaper = new ObservableArray([]);
    viewModel.QuestionsPdPaper = new ObservableArray([]);
    viewModel.QuestionsDisagreePaper = new ObservableArray([]);

    //EMR selection of graph Kenya EMR
    viewModel.QuestionsAgreeKenya = new ObservableArray([]);
    viewModel.QuestionsPaKenya = new ObservableArray([]);
    viewModel.QuestionsNeutralKenya = new ObservableArray([]);
    viewModel.QuestionsPdKenya = new ObservableArray([]);
    viewModel.QuestionsDisagreeKenya = new ObservableArray([]);

    //EMR selection of graph IQCARE EMR
    viewModel.QuestionsAgreeIQ = new ObservableArray([]);
    viewModel.QuestionsPaIQ = new ObservableArray([]);
    viewModel.QuestionsNeutralIQ = new ObservableArray([]);
    viewModel.QuestionsPdIQ = new ObservableArray([]);
    viewModel.QuestionsDisagreeIQ = new ObservableArray([]);



    // insert a new record for the questions
    viewModel.insertQ = function(args) {
      var assess = args.object.value;
      var answer = args.object.text;

      var btn = args.object;
      btn.backgroundColor = "#3489db";

            database.execSQL("INSERT OR REPLACE INTO questions (studyID, question, answer, emr) VALUES (?,?,?,?)", [this.studyID, assess, answer, this.emr]).then(id => {
                console.log("The new record id is: ", id);
            }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    viewModel.selectQ = function(){
    this.Questions = new ObservableArray ([]);
      database.all("SELECT studyID, question, answer from questions").then(rows => {
        for(var row in rows) {
        this.Questions.push({studyID: rows[row][0], question: rows[row][1], answer: rows[row][2]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

    /*Selects the questions about the EMR*/
    viewModel.selectAgree = function(){
    this.QuestionsAgree = new ObservableArray ([]);
      database.all("SELECT question, count(answer) from questions WHERE answer = 'Agree' and question <= 5 group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsAgree.push({question: rows[row][0], answer: rows[row][1]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

    /*Selects the questions about the EMR*/
    viewModel.selectPa = function(){
    this.QuestionsPa = new ObservableArray ([]);
      database.all("SELECT question, count(answer) from questions WHERE answer = 'Partially agree' and question <= 5 group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsPa.push({question: rows[row][0], answer: rows[row][1]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

    /*Selects the questions about the EMR*/
    viewModel.selectNeutral = function(){
    this.QuestionsNeutral = new ObservableArray ([]);
      database.all("SELECT question, count(answer) from questions WHERE answer = 'Neutral' and question <= 5 group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsNeutral.push({question: rows[row][0], answer: rows[row][1]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

    /*Selects the questions about the EMR*/
    viewModel.selectPd = function(){
    this.QuestionsPd = new ObservableArray ([]);
      database.all("SELECT question, count(answer) from questions WHERE answer = 'Partially disagree' and question <= 5 group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsPd.push({question: rows[row][0], answer: rows[row][1]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

    /*Selects the questions about the EMR*/
    viewModel.selectDisagree = function(){
    this.QuestionsDisagree = new ObservableArray ([]);
      database.all("SELECT question, count(answer) from questions WHERE answer = 'Disagree' and question <= 5 group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsDisagree.push({question: rows[row][0], answer: rows[row][1]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

    /*Selects the questions about the Paper*/
    viewModel.selectAgreePaper = function(){
    this.QuestionsAgreePaper = new ObservableArray ([]);
      database.all("SELECT question, count(answer) from questions WHERE answer = 'Agree' and question > 5 group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsAgreePaper.push({question: rows[row][0], answer: rows[row][1]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

    /*Selects the questions about the Paper*/
    viewModel.selectPaPaper = function(){
    this.QuestionsPaPaper = new ObservableArray ([]);
      database.all("SELECT question, count(answer) from questions WHERE answer = 'Partially agree' and question > 5 group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsPaPaper.push({question: rows[row][0], answer: rows[row][1]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

    /*Selects the questions about the Paper*/
    viewModel.selectNeutralPaper = function(){
    this.QuestionsNeutralPaper = new ObservableArray ([]);
      database.all("SELECT question, count(answer) from questions WHERE answer = 'Neutral' and question > 5 group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsNeutralPaper.push({question: rows[row][0], answer: rows[row][1]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

    /*Selects the questions about the Paper*/
    viewModel.selectPdPaper = function(){
    this.QuestionsPdPaper = new ObservableArray ([]);
      database.all("SELECT question, count(answer) from questions WHERE answer = 'Partially disagree' and question > 5 group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsPdPaper.push({question: rows[row][0], answer: rows[row][1]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

    /*Selects the questions about the Paper*/
    viewModel.selectDisagreePaper = function(){
    this.QuestionsDisagreePaper = new ObservableArray ([]);
      database.all("SELECT question, count(answer) from questions WHERE answer = 'Disagree' and question > 5 group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsDisagreePaper.push({question: rows[row][0], answer: rows[row][1]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }


    /*Selects the question based on EMR KENYA*/
    viewModel.selectAgreeKenya = function(){
    this.QuestionsAgreeKenya = new ObservableArray ([]);
      database.all("SELECT question, count(answer), emr from questions WHERE emr = 'Kenya EMR' and answer = 'Agree' group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsAgreeKenya.push({question: rows[row][0], answer: rows[row][1]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }


        /*Selects the question based on EMR KENYA*/
        viewModel.selectPaKenya = function(){
        this.QuestionsPaKenya = new ObservableArray ([]);
          database.all("SELECT question, count(answer), emr from questions WHERE emr = 'Kenya EMR' and answer = 'Partially agree' group by question").then(rows => {
            for(var row in rows) {
            this.QuestionsPaKenya.push({question: rows[row][0], answer: rows[row][1]});
            }
              }, error => {
              console.log("SELECT ERROR", error);
          });
        }

        /*Selects the question based on EMR KENYA*/
        viewModel.selectNeutralKenya = function(){
        this.QuestionsNeutralKenya = new ObservableArray ([]);
          database.all("SELECT question, count(answer), emr from questions WHERE emr = 'Kenya EMR' and answer = 'Neutral' group by question").then(rows => {
            for(var row in rows) {
            this.QuestionsNeutralKenya.push({question: rows[row][0], answer: rows[row][1]});
            }
              }, error => {
              console.log("SELECT ERROR", error);
          });
        }


        /*Selects the question based on EMR KENYA*/
        viewModel.selectPdKenya = function(){
        this.QuestionsPdKenya = new ObservableArray ([]);
          database.all("SELECT question, count(answer), emr from questions WHERE emr = 'Kenya EMR' and answer = 'Partially disagree' group by question").then(rows => {
            for(var row in rows) {
            this.QuestionsPdKenya.push({question: rows[row][0], answer: rows[row][1]});
            }
              }, error => {
              console.log("SELECT ERROR", error);
          });
        }

        /*Selects the question based on EMR KENYA*/
        viewModel.selectDisagreeKenya = function(){
        this.QuestionsDisagreeKenya = new ObservableArray ([]);
          database.all("SELECT question, count(answer), emr from questions WHERE emr = 'Kenya EMR' and answer = 'Disagree' group by question").then(rows => {
            for(var row in rows) {
            this.QuestionsDisagreeKenya.push({question: rows[row][0], answer: rows[row][1]});
            }
              }, error => {
              console.log("SELECT ERROR", error);
          });
        }


        /*Selects the question based on EMR IQCARE*/
        viewModel.selectAgreeIQ = function(){
        this.QuestionsAgreeIQ = new ObservableArray ([]);
          database.all("SELECT question, count(answer), emr from questions WHERE emr = 'IQCARE EMR' and answer = 'Agree' group by question").then(rows => {
            for(var row in rows) {
            this.QuestionsAgreeIQ.push({question: rows[row][0], answer: rows[row][1]});
            }
              }, error => {
              console.log("SELECT ERROR", error);
          });
        }

        /*Selects the question based on EMR IQCARE*/
        viewModel.selectPaIQ = function(){
        this.QuestionsPaIQ = new ObservableArray ([]);
          database.all("SELECT question, count(answer), emr from questions WHERE emr = 'IQCARE EMR' and answer = 'Partially agree' group by question").then(rows => {
            for(var row in rows) {
            this.QuestionsPaIQ.push({question: rows[row][0], answer: rows[row][1]});
            }
              }, error => {
              console.log("SELECT ERROR", error);
          });
        }

        /*Selects the question based on EMR IQCARE*/
        viewModel.selectNeutralIQ = function(){
        this.QuestionsNeutralIQ = new ObservableArray ([]);
          database.all("SELECT question, count(answer), emr from questions WHERE emr = 'IQCARE EMR' and answer = 'Neutral' group by question").then(rows => {
            for(var row in rows) {
            this.QuestionsNeutralIQ.push({question: rows[row][0], answer: rows[row][1]});
            }
              }, error => {
              console.log("SELECT ERROR", error);
          });
        }

        /*Selects the question based on EMR IQCARE*/
        viewModel.selectPdIQ = function(){
        this.QuestionsPdIQ = new ObservableArray ([]);
          database.all("SELECT question, count(answer), emr from questions WHERE emr = 'IQCARE EMR' and answer = 'Partially disagree' group by question").then(rows => {
            for(var row in rows) {
            this.QuestionsPdIQ.push({question: rows[row][0], answer: rows[row][1]});
            }
              }, error => {
              console.log("SELECT ERROR", error);
          });
        }

        /*Selects the question based on EMR IQCARE*/
        viewModel.selectDisagreeIQ = function(){
        this.QuestionsDisagreeIQ = new ObservableArray ([]);
          database.all("SELECT question, count(answer), emr from questions WHERE emr = 'IQCARE EMR' and answer = 'Disagree' group by question").then(rows => {
            for(var row in rows) {
            this.QuestionsDisagreeIQ.push({question: rows[row][0], answer: rows[row][1]});
            }
              }, error => {
              console.log("SELECT ERROR", error);
          });
        }

    // insert a new record for the person
    viewModel.insertPerson = function(args) {
            database.execSQL("INSERT OR REPLACE INTO person (studyID, facility, emr, position, edu, gender, age) VALUES (?,?,?,?,?,?,?)", [this.studyID, this.facility, this.emr, this.position, this.edu, this.gender, this.age]).then(id => {
                console.log("The new record id is: ", id );
                  dialogs.alert({
                      title: "Success",
                      message: "Your data was saved!",
                      okButtonText: "Close"
                  }).then(function () {
                      console.log("Dialog closed!");
                  });

            }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    viewModel.selectPerson = function(){
      this.Person = new ObservableArray([]);
      database.all("SELECT studyID, facility, emr, position, edu, gender, age from person").then(rows => {
        for(var row in rows) {
          this.Person.push({studyID: rows[row][0], facility: rows[row][1], emr: rows[row][2], position: rows[row][3], edu: rows[row][4], gender: rows[row][5], age: rows[row][6]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }


  //Functions to start the general overview of EMR
  viewModel.selectAgree();
  viewModel.selectPa();
  viewModel.selectNeutral();
  viewModel.selectPd();
  viewModel.selectDisagree();

  //Functions to start the general overview of paper
  viewModel.selectAgreePaper();
  viewModel.selectPaPaper();
  viewModel.selectNeutralPaper();
  viewModel.selectPdPaper();
  viewModel.selectDisagreePaper();

  //Functions to start the general overview of Kenya EMR
  viewModel.selectAgreeKenya();
  viewModel.selectPaKenya();
  viewModel.selectNeutralKenya();
  viewModel.selectPdKenya();
  viewModel.selectDisagreeKenya();

  //Functions to start the general overview of IQCARE EMR
  viewModel.selectAgreeIQ();
  viewModel.selectPaIQ();
  viewModel.selectNeutralIQ();
  viewModel.selectPdIQ();
  viewModel.selectDisagreeIQ();

  //Select statements
  viewModel.selectQ();
  viewModel.selectPerson();
  return viewModel;
}
exports.createViewModel = createViewModel;
