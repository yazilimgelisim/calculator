let buttons = document.querySelectorAll('.btn')
let nowProcess = document.getElementById('nowProcess')
let allProcess = document.getElementById('allProcess')


nowProcess.innerHTML = '0'
allProcess.innerHTML = ''


let totalValue = null, frontValue = null;
let cursor = null, equalsCursor = null;

function Nm(value) {
    if (isNaN(value)) {
        return 1
    }
    else {
        if (typeof (value) == 'string') {
            value = Number(value)
        }
        return value
    }
}

function pointControl(value) {
    let rgx = new RegExp(/[\.]/, 'g')
    if (rgx.test(String(value))) {
        value = Nm(value)
        value = value.toFixed(2)
    }
    return Nm(value)
}

function process(btnValue, scValue, callBack) {
    if (cursor != null) {
        return
    }
    frontValue = Nm(scValue)
    cursor = btnValue

    if (totalValue == null) {
        totalValue = frontValue
        allProcess.innerHTML = ` ${totalValue} `
    }
    else {
        totalValue = callBack(Nm(totalValue), Nm(frontValue))
        totalValue = pointControl(totalValue)
        nowProcess.innerHTML = totalValue
        allProcess.innerHTML += ` ${frontValue}${cursor} `
    }
}

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        let btnValue = btn.textContent; btnValue = btnValue.trim()
        let scValue = nowProcess.textContent; scValue = scValue.trim()

        if (!isNaN(btnValue)) {
            if (cursor != null) {
                equalsCursor = cursor
                cursor = null
                scValue = '0'
                nowProcess.innerHTML = scValue
            }
            if (scValue[0] == '0' && scValue[1] == '.') {
                scValue = `${scValue}${btnValue}`
            }
            else {
                if (scValue[0] == '0') {
                    scValue = `${scValue}${btnValue}`
                    scValue = scValue.substr(1, scValue.length)
                }
                else {
                    scValue = `${scValue}${btnValue}`
                }
            }
            nowProcess.innerHTML = scValue
        }
        else {
            if (btnValue == '.') {
                let rgx = new RegExp(/[\.]/, 'g')
                if (rgx.test(scValue)) {
                    return
                }
                else {
                    scValue = `${scValue}${btnValue}`
                    nowProcess.innerHTML = scValue
                }
            }
        }
    })
})


buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        let btnValue = btn.textContent; btnValue = btnValue.trim()
        let scValue = nowProcess.textContent; scValue = scValue.trim()

        if (isNaN(btnValue)) {
            console.log(btnValue)
            switch (btnValue) {
                case '←':
                    if (scValue.length == 1) {
                        scValue = '0'
                    }
                    else {
                        scValue = scValue.substr(0, scValue.length - 1)
                    }
                    nowProcess.innerHTML = scValue
                    break;

                case 'C':
                    totalValue = null
                    frontValue = null
                    allProcess.innerHTML = ''
                    nowProcess.innerHTML = '0'
                    break;


                case 'CE':
                    frontValue = null
                    nowProcess.innerHTML = '0'
                    break;

                case '÷':
                    process(btnValue, scValue, (value1, value2) => {
                        value1 = value1 / value2
                        return value1
                    })
                    break;

                case '×':
                    process(btnValue, scValue, (value1, value2) => {
                        value1 = value1 * value2
                        return value1
                    })
                    break;

                case '−':
                    process(btnValue, scValue, (value1, value2) => {
                        value1 = value1 - value2
                        return value1
                    })
                    break;

                case '+':
                    process(btnValue, scValue, (value1, value2) => {
                        value1 = value1 + value2
                        return value1
                    })
                    break;

                case '=':
                    switch (equalsCursor) {
                        case '÷':
                            process(equalsCursor, scValue, (value1, value2) => {
                                value1 = value1 / value2
                                return value1
                            })
                            break;

                        case '×':
                            process(equalsCursor, scValue, (value1, value2) => {
                                value1 = value1 * value2
                                return value1
                            })
                            break;

                        case '−':
                            process(equalsCursor, scValue, (value1, value2) => {
                                value1 = value1 - value2
                                return value1
                            })
                            break;

                        case '+':
                            process(equalsCursor, scValue, (value1, value2) => {
                                value1 = value1 + value2
                                return value1
                            })
                    }
                    equalsCursor = null
                    break;

                case '+/−':
                    frontValue = Nm(scValue)
                    if(frontValue == 0 || frontValue == null){
                        return
                    }

                    frontValue = frontValue * -1 
                    nowProcess.innerHTML = frontValue 
                    cursor = null
                    break;
            }
        }
    })
})