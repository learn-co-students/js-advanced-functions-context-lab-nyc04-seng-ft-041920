/* Your Code Here */
let createEmployeeRecord = (arr) => {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = (arr) => {
  return arr.map(createEmployeeRecord)
}

// no more big arrow syntax :(
let createTimeInEvent = function(dateWorked) {
  let [date, hour] = dateWorked.split(' ')
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  })
  return this
}

let createTimeOutEvent = function(dateWorked) {
  let [date, hour] = dateWorked.split(' ')
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  })
  return this
}

let hoursWorkedOnDate = function(day) {
  let specificDayIn = this.timeInEvents.find(timestamp => timestamp.date == day)
  let specificDayOut = this.timeOutEvents.find(timestamp => timestamp.date == day)
  return (specificDayOut.hour - specificDayIn.hour) / 100
}

let wagesEarnedOnDate = function(day) {
  return hoursWorkedOnDate.call(this, day) * this.payPerHour
}


let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = (arr, str) => {
  return arr.find(employee => employee.firstName === str)
}

let calculatePayroll = function(arr) {
  return arr.reduce((total, employee) => total + allWagesFor.call(employee), 0)
}
