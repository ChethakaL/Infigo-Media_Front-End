import React from 'react';
import ReactECharts from 'echarts-for-react';

function Home() {

    // Pie Chart Option
    const pieChartOption = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access Source',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ]
            }
        ]
    };

    // Line Chart Option
    const lineChartOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }
        ]
    };

    // Bar Chart Option
    const barChartOption = {
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110],
                type: 'bar'
            }
        ]
    };

    return (
        <div>
            {/*Quick Info Boxes*/}
            <div className='row home' style={{ justifyContent: 'center' }}>
                <div className='home-total-boxes row'>
                    <h3>Total Earnings</h3>
                    <h2>00</h2>
                </div>
                <div className='home-total-boxes row'>
                    <h3>Total Orders</h3>
                    <h2>00</h2>
                </div>
                <div className='home-total-boxes row'>
                    <h3>Monthly Earning</h3>
                    <h2>00</h2>
                </div>
            </div>
            {/* Charts */}
            <div className='home-chart'>
                <div className='row' style={{ justifyContent: 'center' }}>
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
