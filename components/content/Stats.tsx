import React from 'react';
import {Dimensions, View} from 'react-native';
import Svg, {Line, Polygon, Text as SvgText} from 'react-native-svg';

const Stats = ({data = [], labels = [], height = Dimensions.get('window').width}) => {
    const size = Dimensions.get('window').width;
    const numOfSides = 6;
    const radius = Math.min(size, height) / 3.4;
    const angleSlice = (Math.PI * 2) / numOfSides;
    let labelOffset = -30;

    const getPolygonPoints = (factor) => {
        return Array.from({length: numOfSides}).map((_, i) => {
            const x = radius + factor * radius * Math.cos(i * angleSlice - Math.PI / 2);
            const y = radius + factor * radius * Math.sin(i * angleSlice - Math.PI / 2);
            return `${x},${y}`;
        }).join(' ');
    };

    const getDataPoints = () => {
        return data.map((value, i) => {
            const x = radius + (value / 255) * radius * Math.cos(i * angleSlice - Math.PI / 2);
            const y = radius + (value / 255) * radius * Math.sin(i * angleSlice - Math.PI / 2);
            return `${x},${y}`;
        }).join(' ');
    };

    const renderLines = () => {
        return Array.from({length: numOfSides}).map((_, i) => {
            const x1 = radius;
            const y1 = radius;
            const x2 = radius + radius * Math.cos(i * angleSlice - Math.PI / 2);
            const y2 = radius + radius * Math.sin(i * angleSlice - Math.PI / 2);
            return (
                <Line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#E0E0E0"
                    strokeWidth="2"
                />
            );
        });
    };

    const renderLabels = () => {
        return labels.map((label, i) => {
            const x = radius + (radius + labelOffset) * Math.cos(i * angleSlice - Math.PI / 2);
            const y = radius + (radius + labelOffset) * Math.sin(i * angleSlice - Math.PI / 2);
            return (
                <SvgText
                    key={i}
                    x={x}
                    y={y}
                    fill="black"
                    fontWeight="bold"
                    fontSize="14"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                >
                    {label}
                </SvgText>
            );
        });
    };

    // Fonction pour afficher la grille
    const renderGrid = () => {
        const levels = 10;
        return Array.from({length: levels}).map((_, i) => (
            <Polygon
                key={i}
                points={getPolygonPoints((i + 1) / levels)}
                fill="none"
                stroke="#E0E0E0"
                strokeWidth="2"
            />
        ));
    };

    return (
        <View>
            <Svg width={size} height={height} viewBox={`0 0 ${size} ${height}`}>
                {renderGrid()}
                {renderLines()}
                <Polygon
                    points={getDataPoints()}
                    fill="rgba(63, 81, 181, 0.5)"
                    stroke="rgba(63, 81, 181, 1)"
                    strokeWidth="2"
                />
                {renderLabels()}
            </Svg>
        </View>
    );
};


export default Stats;


















