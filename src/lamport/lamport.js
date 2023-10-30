let messageSent1 = [
  {
    event: 5,
    to: 2,
  },
];
let OrderOfEvents1 = [
  {
    numP: 0,
    numE: 2,
    time: 3,
  },
];
class prccessues {
  constructor(num, numberOfEvents, messagesSent) {
    this.num = num;
    this.numberOfEvents = numberOfEvents;
    this.timeOfEvents = new Array(numberOfEvents);
    this.messagesSent = messagesSent;
    this.endEvents = 0;
  }
  IAMTTE(event, messages, processuss) {
    const p = messages.findIndex(
      (v) => v?.findIndex((v2) => v2?.event == event && v2?.to == this.num) >= 0
    );
    const e =
      p >= 0
        ? processuss?.[p]?.messagesSent?.findIndex((v2) => {
            return v2?.event == event;
          })
        : undefined;
    return {
      p,
      e,
    };
  }
  IAMTAE(event, messages) {
    return messages.findIndex((v) =>
      v?.findIndex((v2) => v2?.event == event && v2?.to != this.num)
    );
  }
  isEnd() {
    return this.numberOfEvents == this.endEvents;
  }
}

function lamport(proccessues) {
  const messages = proccessues.map((p) => p.messagesSent);
  let OrderOfEvents = [];
  let end = false;
  while (!end) {
    for (let index1 = 0; index1 < proccessues.length; index1++) {
      // console.log("proccess: " + index1);
      if (proccessues[index1].isEnd()) break;
      for (
        let event = proccessues[index1].endEvents;
        event <= proccessues[index1].numberOfEvents - 1;
        event++
      ) {
        const p = proccessues[index1].IAMTTE(event + 1, messages, proccessues);
        const p2 = p.p;
        const e2 = p.e;
        if (p2 >= 0) {
          const currentTime =
            proccessues[index1].timeOfEvents[event - 1] ||
            proccessues[index1].endEvents;
          const newTime = lookup(proccessues[p2], e2, currentTime); // synchronize a time
          if (newTime) {
            proccessues[index1].timeOfEvents[event] = newTime;
            proccessues[index1].endEvents += 1;
          } else {
            break;
          }
        } else {
          if (proccessues[index1].endEvents == 0) {
            proccessues[index1].timeOfEvents[event] = event + 1;
          } else {
            proccessues[index1].timeOfEvents[event] =
              proccessues[index1].timeOfEvents[event - 1] + 1;
          }
          proccessues[index1].endEvents += 1;
        }
        // console.log(index1+1,event+1);
      }
    }
    let multiple = true;
    proccessues.map((p) => {
      multiple = multiple * p.isEnd();
      return;
    });
    end = multiple ? true : false;
  }
  return proccessues
}
function lookup(proccess, event, time) {
  if (event == 0) {
    return time > event ? time + 1 : event + 2;
  }
  if (proccess.endEvents - 1 > event) {
    const newTime =
      time > proccess.timeOfEvents[event - 1]
        ? time + 1
        : proccess.timeOfEvents[event - 1] + 1;
    return newTime;
  } else if (proccess.endEvents - 1 == event) {
    const newTime =
      time > proccess.timeOfEvents[event]
        ? time + 1
        : proccess.timeOfEvents[event] + 1;
    return newTime;
  }
}
// let p1 = new prccessues(1, 5, [
//   { to: 2, event: 1 },
//   { to: 3, event: 4 },
// ]);
// let p2 = new prccessues(2, 4, [{}, {}, {}, { to: 1, event: 5 }]);
// let p3 = new prccessues(3, 5, [
//   { to: 2, event: 2 },
//   {},
//   { to: 1, event: 4 },
//   {},
//   { to: 2, event: 3 },
// ]);
// lamport([p1, p2, p3]);
// console.log(p1);
// console.log(p2);
// console.log(p3);
export { lamport,prccessues };
