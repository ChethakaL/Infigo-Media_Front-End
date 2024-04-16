import React, {useState,useEffect} from 'react';
import ReactECharts from 'echarts-for-react';
import axios from "axios";
import {BiLoaderCircle, BiPackage, BiSolidTruck} from "react-icons/bi";

function Home() {
    const [total, setTotalEarnings] = useState([]);
    const [monthlyEarnings, setMonthlyEarnings] = useState([]);
    const [pending, setPending] = useState(0);
    const [processing, setProcessing] = useState(0);
    const [delivering, setDelivering] = useState(0);
    const [pieChartOption, setPieChartOption] = useState({
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center' },
        series: [{
            name: 'Product Sales',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: { show: false, position: 'center' },
            emphasis: { label: { show: true, fontSize: '18', fontWeight: 'bold' } },
            labelLine: { show: false },
            data: []
        }]
    });
    const [lineChartOption, setLineChartOption] = useState({
        xAxis: { type: 'category', data: [] },
        yAxis: { type: 'value' },
        series: [{ type: 'line', data: [] }]
    });
    const [barChartOption, setBarChartOption] = useState({
        xAxis: { type: 'category', data: [] },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: [] }]
    });


    useEffect(() => {
        const fetchTotalEarnings = async() => {
            try{
                const response = await axios.get('http://localhost:4001/backend/api/earnings/total');
                setTotalEarnings(response.data[0]);
            }catch(error) {
                console.error(error);
            }
        }

        const fetchMonthlyEarnings = async() => {
            try{
                const response = await axios.get('http://localhost:4001/backend/api/earnings/monthly-earnings');
                setMonthlyEarnings(response.data[0]);
            }catch(error){
                console.error(error);
            }
        }

        const fetchCurrentOrders = async () => {
            try {
                const response = await axios.get('http://localhost:4001/backend/api/earnings/current-orders');
                setPending(response.data[0]);
                setProcessing(response.data[1]);
                setDelivering(response.data[2]);
            }catch (e) {
                console.error(e);
            }
        }
        fetchCurrentOrders();
        fetchMonthlyEarnings();
        fetchTotalEarnings();
    }, [total, monthlyEarnings]);

    useEffect(() => {
        const fetchData = async () => {
            const productSalesResponse = await fetch('http://localhost:4001/backend/api/earnings/product-sales');
            const productSalesData = await productSalesResponse.json();
            setPieChartOption(oldOptions => ({ ...oldOptions, series: [{ ...oldOptions.series[0], data: productSalesData }] }));

            const dailySalesResponse = await fetch('http://localhost:4001/backend/api/earnings/daily-sales');
            const dailySalesData = await dailySalesResponse.json();
            setLineChartOption(oldOptions => ({ ...oldOptions, xAxis: { ...oldOptions.xAxis, data: dailySalesData.days }, series: [{ data: dailySalesData.sales }] }));

            const monthlySalesResponse = await fetch('http://localhost:4001/backend/api/earnings/monthly-product-sales');
            const monthlySalesData = await monthlySalesResponse.json();
            setBarChartOption(oldOptions => ({ ...oldOptions, xAxis: { ...oldOptions.xAxis, data: monthlySalesData.month}, series: [{ data: monthlySalesData.product}] }));
        };

        fetchData();
    }, []);



    return (
        <div>
            {/*Quick Info Boxes*/}
            <div className='row home' style={{justifyContent: 'center', alignItems:'center'}}>
                <div className='home-total-boxes row'>
                    <h3>Total Earnings</h3>
                    <h2>${total.totalEarnings || '00'}</h2>
                </div>
                <div className='home-total-boxes row'>
                    <h3>Total Orders</h3>
                    <h2>{total.totalOrders || '00'}</h2>
                </div>
                <div className='home-total-boxes row'>
                    <h3>Monthly Earning</h3>
                    <h2>{monthlyEarnings.monthlyEarnings}</h2>
                </div>
                <div className='home-total-boxes'>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                        <BiLoaderCircle size={24}/>
                        <h3>Pending</h3>
                        <h2>{pending.count||'00'}</h2>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                        <BiPackage size={24}/>
                        <h3>Processing</h3>
                        <h2>{processing.count || '00'}</h2>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                        <BiSolidTruck size={24}/>
                        <h3>Delivering</h3>
                        <h2>{delivering.count || '00'}</h2>
                    </div>
                </div>
            </div>
            {/* Charts */}
            <div className='home-chart'>
                <div className='row' style={{justifyContent: 'center'}}>
                    <div className='chart-box-sm'>
                        <h4>Pie Chart</h4>
                        <ReactECharts option={pieChartOption} />
                    </div>
                    <div className='chart-box-md'>
                        <h4>Line Chart</h4>
                        <ReactECharts option={lineChartOption} />
                    </div>
                </div>
                <div className='chart-box-lg'>
                    <h4>Bar Chart</h4>
                    <ReactECharts option={barChartOption} />
                </div>
            </div>
        </div>
    )
}

export default Home;
