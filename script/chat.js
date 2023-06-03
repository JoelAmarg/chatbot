// initialize by constructing a named function..chat-bubble.
// .and add text processing plugin:
var chatWindow = new Bubbles(document.getElementById("chat"), "chatWindow", {
  // the one that we care about is inputCallbackFn()
  // this function returns an object with some data that we can process from user input
  // and understand the context of it

  // this is an example function that matches the text user typed to one of the answer bubbles
  // this function does no natural language processing
  // this is where you may want to connect this script to NLC backend.
  inputCallbackFn: function(o) {
    // add error conversation block & recall it if no answer matched
    var miss = function() {
      chatWindow.talk(
        {
          "i-dont-get-it": {
            says: [
              "Sorry, I don't get it 😕. Pls repeat? Or you can just click below 👇"
            ],
            reply: o.convo[o.standingAnswer].reply
          }
        },
        "i-dont-get-it"
      )
    }

    // do this if answer found
    var match = function(key) {
      setTimeout(function() {
        chatWindow.talk(convo, key) // restart current convo from point found in the answer
      }, 600)
    }

    // sanitize text for search function
    var strip = function(text) {
      return text.toLowerCase().replace(/[\s.,\/#!$%\^&\*;:{}=\-_'"`~()]/g, "")
    }

    // search function
    var found = false
    o.convo[o.standingAnswer].reply.forEach(function(e, i) {
      strip(e.question).includes(strip(o.input)) && o.input.length > 0
        ? (found = e.answer)
        : found ? null : (found = false)
    })
    found ? match(found) : miss()
  }
}) // done setting up chat-bubble

// conversation object defined separately, but just the same as in the
// "Basic chat-bubble Example" (1-basics.html)
var convo = {
  "ice": {
    says: ["Hallo", "ik ben *botnaam*, waarmee kan ik u \n" +
    "helpen?"],
    reply: [
      {
        question: "Ik heb pijn",
        answer: "Ik heb pijn"
      }
    ]
  },
  "Ik heb pijn": {
    says: ["Waar heb je pijn"],
    reply: [
      {
        question: "Tand",
        answer: "Tand"
      },{
        question: "Tandvlees",
        answer: "Tandvlees"
      },{
        question: "Overig",
        answer: "Overig"
      }
    ]
  },
  "Overig": {
    says: ["Hoelang heb je al pijn?"],
    reply: [
      {
        question: "8 dagen",
        answer: "8 dagen"
      },  {
        question: "15 dagen",
        answer: "ice"
      },  {
        question: "langer dan 1 maand",
        answer: "langer dan 1 maand"
      },
    ]
  },"Tand": {
    says: ["Hoelang heb je al pijn?"],
    reply: [    {
      question: "8 dagen",
      answer: "8 dagen"
    },  {
      question: "15 dagen",
      answer: "ice"
    },  {
      question: "langer dan 1 maand",
      answer: "langer dan 1 maand"
    },
    ]
  },"Tandvlees": {
    says: ["Hoelang heb je al pijn?"],
    reply: [
      {
        question: "8 dagen",
        answer: "8 dagen"
      },  {
        question: "15 dagen",
        answer: "ice"
      },  {
        question: "Langer dan 1 maand",
        answer: "Langer dan 1 maand"
      },
    ]
  },"Langer dan 1 maand": {
    says: ["Gebruik je pijnstillers?"],
    reply: [
      {
        question: "Ja",
        answer: "Ja"
      },  {
        question: "Nee",
        answer: "Nee"
      }
    ]
  },"Ja": {
    says: ["Wanneer doet het pijn?"],
    reply: [
      {
        question: "Bij het kauwen",
        answer: "Bij het kauwen"
      },  {
        question: "Koude dranken",
        answer: "Koude dranken"
      },  {
        question: "Eten",
        answer: "Eten"
      },  {
        question: "Spontaan",
        answer: "Spontaan"
      }
    ]
  },

}

// pass JSON to your function and you're done!
chatWindow.talk(convo);