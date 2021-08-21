import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {createUseStyles} from 'react-jss';
import {IChartProps} from '../types/chart';

const XAxisLabel = 'Completeness of vision ->';
const YAxisLabel = 'Ability to execute ->';

export default function Chart(props: React.PropsWithChildren<IChartProps>) {
    const {data, editItemFull} = props;
    const chartRef = useRef(null);
    const classes = useStyles();

    const initializeChart = () => {
        const margins = {
            left: 70,
            right: 30,
            top: 20,
            bottom: 50
        };

        const width = 700;
        const height = 600;
        const domainWidth = width - margins.left - margins.right;
        const domainHeight = height - margins.top - margins.bottom;

        d3.select(chartRef.current).select('svg').remove();

        const svg = d3
            .select(chartRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margins.left},${margins.top})`);

        svg
            .append("rect")
            .attr('fill', 'none')
            .attr("stroke", '#a4b1bc')
            .attr("width", domainWidth)
            .attr("height", domainHeight / 2);

        svg
            .append("rect")
            .attr('fill', 'none')
            .attr("stroke", '#a4b1bc')
            .attr("width", domainWidth / 2)
            .attr("height", domainHeight);

        if(data){
            const x = d3
                .scaleLinear()
                .domain([0, 100])
                .range([0, domainWidth]);

            const y = d3
                .scaleLinear()
                .domain([0, 100])
                .range([domainHeight, 0]);

            svg
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0, ${y.range()[0]})`);

            svg.append('g').attr('class', 'y axis');

            svg
                .append('text')
                .attr('fill', '#414241')
                .attr('text-anchor', 'end')
                .attr('x', width / 1.7)
                .attr('y', height - 35)
                .text(XAxisLabel);

            svg
                .append('text')
                .attr('fill', '#414241')
                .attr('text-anchor', 'middle')
                .attr('x', -250)
                .attr('y', -30)
                .attr('transform', 'rotate(-90)')
                .text(YAxisLabel);

            let xAxis = d3.axisBottom(x).tickPadding(1);
            let yAxis = d3.axisLeft(y).tickPadding(2);

            // @ts-ignore
            svg.selectAll('g.y.axis').call(yAxis);
            // @ts-ignore
            svg.selectAll('g.x.axis').call(xAxis);

            const item = svg.selectAll('g.node').data(data.map((dataItem, index) => {
                return {...dataItem, index};
            }));

            svg
                .append('g')
                .attr('class', 'qxgrid')
                .call(xAxis.tickFormat(null).tickSize(550).ticks(0));

            const itemGroup = item
                .enter()
                .append('g')
                .attr('class', 'node')
                .attr('data-vision', (d) => {
                    return d.vision;
                })
                .attr('data-ability', (d) => {
                    return d.ability;
                })
                .attr('transform', (d) => {
                    return `translate(${x(d.vision)}, ${y(d.ability)})`
                });

            itemGroup
                .append('circle')
                .attr('r', (d) => {
                    return 10
                })
                .attr('class', 'dot')
                .style('fill', (d) => {
                    return '#327297'
                })
                .append('title')
                .text((d) => {
                    return d.label;
                });

            const dragHandler = d3.drag()
                .on('drag', (d) => {
                    // d3.select(d)
                    //     .attr('x', d.x)
                    //     .attr('y', d.y);
                });

            dragHandler(svg.selectAll('circle'));
        }
    }

    useEffect(initializeChart, [data]);

    return (
        <div className={classes.chartContainer}>
            {data &&
                <>
                    <div ref={chartRef}/>
                    <div className="quadrant-title" id="challenger">
                        Challengers
                    </div>
                    <div className="quadrant-title" id="leader">
                        Leaders
                    </div>
                    <div className="quadrant-title" id="niche">
                        Niche Players
                    </div>
                    <div className="quadrant-title" id="visionaries">
                        Visionaries
                    </div>
                </>

            }
        </div>
    );
}

const useStyles = createUseStyles({
    chartContainer: {
        position: 'relative',
        '& .quadrant-title': {
            position: 'absolute',
            background: 'rgba(59, 66, 77, 0.7)',
            color: 'white',
            borderRadius: '5px',
            padding: '0.1rem 2rem',
            opacity: '0.5'
        },
        '& #challenger': {
            position: 'absolute',
            top: '45px',
            left: '145px'
        },
        '& #visionaries': {
            position: 'absolute',
            top: '500px',
            left: '470px'
        },
        '& #niche': {
            position: 'absolute',
            top: '500px',
            left: '145px'
        },
        '& #leader': {
            position: 'absolute',
            top: '45px',
            left: '470px'
        }
    }
});