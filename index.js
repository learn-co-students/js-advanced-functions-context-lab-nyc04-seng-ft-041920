/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = (employeeArr) => {
    let employeeObj = {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj
}

let createEmployeeRecords = function (arrOfemployee) {
    return arrOfemployee.map(function (employeeArr) {
        return createEmployeeRecord(employeeArr)
    })
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
}

let hoursWorkedOnDate = function (date) {
    let timeIn = this.timeInEvents.find(employeeTimeIn => employeeTimeIn.date === date)
    let timeOut = this.timeOutEvents.find(employeeTimeOut => employeeTimeOut.date === date)

    return (timeOut.hour - timeIn.hour)/100
}

let wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this, date) * parseFloat(this.payPerHour)
  }

let findEmployeeByFirstName = function (arrOfemployeeObj, firstName) {
    return arrOfemployeeObj.find(employeeObj => employeeObj.firstName === firstName)
}
  
let calculatePayroll= function (arrOfemployeeObj) {
    return arrOfemployeeObj.reduce(function (total, employeeObj) {return total + allWagesFor.call(employeeObj)},0)
}