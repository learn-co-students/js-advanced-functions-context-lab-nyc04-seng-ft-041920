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

const createEmployeeRecord = function(employeeArr){
    const employee = {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

const createEmployeeRecords = function(employees){
    return employees.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = function(dateStamp){
    const [date, hour] = dateStamp.split(" ")

    const timeObj = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    this.timeInEvents.push(timeObj)
    return this
    
}


const createTimeOutEvent = function(dateStamp){
    const [date, hour] = dateStamp.split(" ")

    const timeObj = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(timeObj)
    return this
    
}

function hoursWorkedOnDate(date){
    const timeOut = this.timeOutEvents.find(function(timeObj){
        return timeObj.date == date
    })

    const timeIn = this.timeInEvents.find(function(timeObj){
        return timeObj.date === date
    })

    return (timeOut.hour - timeIn.hour) /100

}
const wagesEarnedOnDate = function(date){
    return this.payPerHour * hoursWorkedOnDate.call(this, date)
}

const findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(employee){
        return employee.firstName === firstName
    })
}

const calculatePayroll = function(employees){
    return employees.reduce(function(memo, employee){
        return memo + allWagesFor.call(employee)
    }, 0)
}