/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(employeeDetails) {
    const employeeRecord = {
        firstName: employeeDetails[0],
        familyName: employeeDetails[1],
        title: employeeDetails[2],
        payPerHour: employeeDetails[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord
}

function createEmployeeRecords(aoa) {
    return aoa.map(function(arr) {
        return createEmployeeRecord(arr)
    })
}

function createTimeInEvent(dateStamp) {
    const timeDate = dateStamp.split(" ")
    const timeObj = {
        type: "TimeIn",
        hour: parseInt(timeDate[1]),
        date: timeDate[0]
    }
    this.timeInEvents.push(timeObj)
    return this
}

function createTimeOutEvent(dateStamp) {
    const timeDate = dateStamp.split(" ")
    const timeObj = {
        type: "TimeOut",
        hour: parseInt(timeDate[1]),
        date: timeDate[0]
    }
    this.timeOutEvents.push(timeObj)
    return this
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(function(timeIn) {
        return timeIn.date === date
    })

    const timeOut = this.timeOutEvents.find(function(timeOut) {
        return timeOut.date === date
    })

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    const wagesEarned = this.payPerHour * hoursWorked
    return wagesEarned
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

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(employeeObj) {
        return employeeObj.firstName === firstName
    })
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(total, employeeObj) {
        return total + allWagesFor.call(employeeObj)
    },0)
}