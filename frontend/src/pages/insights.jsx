import { useRecoilState } from "recoil";
import { datastate } from "../../state";
import  Linechart  from "../component/linechart";
import './page.css';

const Insights = () => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();

    const MonthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const [data] = useRecoilState(datastate);

    const monthlyExpenditure = data.filter(
        (item) =>
            ((parseInt(item.date.slice(6, 8)) === month + 1) &&
                (parseInt(item.date.slice(8, 10)) <= day)) ||
            ((parseInt(item.date.slice(6, 8)) === month) &&
                (parseInt(item.date.slice(8, 10)) >= day))
    );


    let tempMonth = month + 1
    let tempDay = day
    let LineChartData = new Map()
    while (tempMonth >= month || (tempMonth === month && day >= tempDay)){
        let tempSpend = 0;
        data.forEach((item) => {
            if((parseInt(item.date.slice(8,10)) === tempDay) &&
            (parseInt(item.date.slice(6,8)) === tempMonth + 1) &&
            item.money < 0){
                tempSpend += item.money
            }
        })
        LineChartData.set(tempDay,Math.abs(tempSpend))
        if(tempDay === 1){
            tempDay = MonthLength[tempMonth - 1]
            tempMonth-- ;
        }else{
            tempDay-- ;
        }
    }

    return (
        <div className="graph">
            <Linechart  LineChartData={LineChartData}/>
        </div>
    );
};

export default Insights;
