import React, {Component} from 'react';

type TSide = 'top' | 'bottom' | 'left' | 'right';

interface IFrame {
	width: number;
	height: number;
}

interface IFrameBeamProps {
	width: number;
	frame: IFrame;
	side: TSide;
}

interface IPoint {
	x: number;
	y: number;
}

type TPoints = IPoint[];

export default class FrameBeam extends Component<IFrameBeamProps> {
	render() {
		const {side, width, frame} = this.props;
		const style = {stroke: 'black', fill: 'transparent', strokeWidth: 1};

		const sidePoints: Record<TSide, TPoints> = {
			left: [{x: 0, y: 0}, {x: width, y: width}, {x: width, y: frame.height - width}, {x: 0, y: frame.height}],
			right: [{x: frame.width, y: 0}, {x: frame.width, y: frame.height}, {x: frame.width - width, y: frame.height - width}, {x: frame.width - width, y: width}],
			bottom: [{x: frame.width, y: frame.height}, {x: 0, y: frame.height}, {x: width, y: frame.height - width}, {x: frame.width - width, y: frame.height - width}],
			top: [{x: 0, y: 0}, {x: frame.width, y: 0}, {x: frame.width - width, y: width}, {x: width, y: width}]
		};

		const points: TPoints = sidePoints[side];

		const d = points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`) + ' Z';
		return <path d={d} style={style}/>;
	}
}