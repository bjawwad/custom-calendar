import React, { Component } from 'react';
import dateFns from "date-fns";

class Calender extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date()
        }
    }

    renderHeader(){
        const dateFormat = "MMMM YYYY";
        const {currentMonth} = this.state;
        return(
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>chevron_left</div>
                </div>
                <div className="col col-center">
                    <span>
                        {dateFns.format(currentMonth, dateFormat)}
                    </span>
                </div>

                <div className="col col-end">
                    <div className="icon" onClick={this.nextMonth}>
                    chevron_right</div>
                </div>
            </div>
        )
    }

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    }

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    }

    renderDays(){
        const dateFormat = "dddd";
        const {currentMonth} = this.state;    
        let days = [];

        let startDate = dateFns.startOfWeek(currentMonth);
        for (let i = 0; i < 7; i++){
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            )
        }

        return (
            <div className="days row">
                {days}
            </div>
        )


    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
    
        const dateFormat = "D";
        const rows = [];
    
        let days = [];
        let day = startDate;
        let formattedDate = "";
    
        while (day <= endDate) {
          for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);
            const cloneDay = day;
            days.push(
              <div
                className={`col cell ${
                  !dateFns.isSameMonth(day, monthStart)
                    ? "disabled"
                    : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                }`}
                key={day}
                onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
              >
                <span className="number">{formattedDate}</span>
                <span className="bg">{formattedDate}</span>
              </div>
            );
            day = dateFns.addDays(day, 1);
          }
          rows.push(
            <div className="row" key={day}>
              {days}
            </div>
          );
          days = [];
        }
        return <div className="body">{rows}</div>;
      }

      onDateClick = day => {
        this.setState({
          selectedDate: day
        });
      };

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

export default Calender;