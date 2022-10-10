
const getDaysToSendAll = {

    padTo2Digits: (num) => {
        return num.toString().padStart(2, '0');
    },

    formatDate: (date) => {
        date = new Date(date)
        return [
            date.getFullYear(),
            getDaysToSendAll.padTo2Digits(date.getMonth() + 1),
            getDaysToSendAll.padTo2Digits(date.getDate()),
        ].join('-');
    },

    passDaysToCalculate: (dias, totalEnvio, dataInicial) => {
        var alldays = [];
        for (let i = 0; i < dias.length; i++) {
            var allDaysOfWeek = getDaysToSendAll.getDays(dias[i], dataInicial)
            for (let i_day = 0; i_day < allDaysOfWeek.length; i_day++) {
                const completeDate = allDaysOfWeek[i_day];
                if (getDaysToSendAll.verifyDate(dataInicial, completeDate)) {
                    alldays.push(completeDate);
                }
            }
        }
        var isDescending = false; //set to false for ascending
        var fileredDates = (alldays.sort((a, b) => isDescending ? new Date(b).getTime() - new Date(a).getTime() : new Date(a).getTime() - new Date(b).getTime()));
        var startNowCheck = (getDaysToSendAll.startDateIsNow(dataInicial) === true);
        var CheckDay = getDaysToSendAll.checkWeekDayStart(dataInicial, dias)
        var formatDateStart = (totalEnvio - 1);
        var getAllDatesToSend = getDaysToSendAll.filterAllDays(fileredDates, startNowCheck, dataInicial, dias)
        var finalDateToSend = getAllDatesToSend[formatDateStart];
        return getDaysToSendAll.formatDate(finalDateToSend);
    },

    getDays: (dia_semana, date_now) => {
        // pegar posicao do dia da semana na lista
        var dayOfWeek = getDaysToSendAll.positionDays().indexOf(dia_semana);
        // pegar apenas o dia de hoje
        var data = new Date();
        var day = Number(data.getDate());
        // retornar todos os dias em que existem estes dias da semana
        var getAllDays = getDaysToSendAll.getSpecificDays(day, dayOfWeek, date_now);
        return getAllDays;
    },

    getSpecificDays: (day, weekDay, date_now) => {
        // Pegar data atual
        var d = new Date(date_now);
        // Pegar o dia inicial do mes
        d.setDate(day);
        // Pegar o fim do ano e o fim do mes
        var endYear = d.getFullYear() + 1;
        var endMonth = d.getMonth();
        // Pegar o mes a partir de hoje
        d.setDate(d.getDate() + (weekDay - (d.getDay() || 7)) % 7);
        var returnDates = [new Date(+d)];
        // Gerar todas as datas a partir de hoje
        while (d.getFullYear() < endYear || d.getMonth() != endMonth) {
            returnDates.push(new Date(d.setDate(d.getDate() + 7)));
        }
        return returnDates;
    },

    positionDays: () => {
        return ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
    },

    startDateIsNow: (startDate) => {
        var inpDate = new Date(startDate);
        var currDate = new Date();
        return (inpDate.setHours(0, 0, 0, 0) == currDate.setHours(0, 0, 0, 0))
    },

    verifyDate: (dateOfStart, filteredDate) => {
        var start = new Date(dateOfStart);
        var dateFill = new Date(filteredDate);
        return (start < dateFill)
    },

    filterAllDays: (object, isNow, dateStart, weekDays) => {

        var CheckDay = getDaysToSendAll.checkWeekDayStart(dateStart, weekDays)
        var renderObject = [];
        if (isNow) {
            renderObject = (object);
        } else {
            if (CheckDay === true) {
                var startDate = [new Date(dateStart)]
                renderObject = startDate.concat(object)
            } else {
                renderObject = object;
            }
        }
        return renderObject;
    },

    checkWeekDayStart: (start, weekDays) => {
        var diasDeDisparo = getDaysToSendAll.positionDays();
        var diaInicial = new Date(start);
        var check = (weekDays.indexOf(diasDeDisparo[diaInicial.getDay()]) != -1)
        return check;
    }
}


var InicialDate = '2022-10-10T20:50:00.377Z'

var diasDeEnvio = ['ter', 'qua', 'sex'];

var diasTotais = 3;

var diaDeFinalizacao = getDaysToSendAll.passDaysToCalculate(diasDeEnvio, diasTotais, InicialDate);

console.log(diaDeFinalizacao)




