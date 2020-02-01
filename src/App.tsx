import React, {ChangeEvent, Component} from 'react';
import './App.scss';
import FrameBeam from './window/FrameBeam';

interface IAppState {
	frameBeamWidth: number;
}

interface IFrame {
	width: number;
	height: number;
}

interface IProduct {
	frame: IFrame;
}

export default class App extends Component<{}, IAppState> {
	state: IAppState = {
		frameBeamWidth: 20
	};

	render() {
		const frame = {
			height: 300
		};

		const frameBeam = {
			width: this.state.frameBeamWidth
		};

		const products: IProduct[] = [{
			frame: {
				width: 150,
				height: frame.height
			}
		}, {
			frame: {
				width: 200,
				height: frame.height
			}
		}, {
			frame: {
				width: 150,
				height: frame.height
			}
		}, {
			frame: {
				width: 150,
				height: frame.height
			}
		}, {
			frame: {
				width: 350,
				height: frame.height
			}
		}];

		const construction = {
			width: products.reduce((result, product) => result + product.frame.width, 0),
			height: frame.height
		};

		return (
			<div className="App">
				<p>
					<input type='text' onChange={this.onInputChange} value={this.state.frameBeamWidth}/>
				</p>
				<svg width={construction.width} height={construction.height}>
					{
						products.map((product, index, products) => (
							<g key={index} transform={this.getProductTranslate(index, products)}>
								<FrameBeam side='top' width={frameBeam.width} frame={product.frame}/>
								<FrameBeam side='bottom' width={frameBeam.width} frame={product.frame}/>
								<FrameBeam side='left' width={frameBeam.width} frame={product.frame}/>
								<FrameBeam side='right' width={frameBeam.width} frame={product.frame}/>
							</g>
						))
					}
				</svg>
			</div>
		);
	}

	private getProductTranslate(productIndex: number, products: IProduct[]) {
		const offsetX = (
			products.reduce((result, product, index) => {
				return result + product.frame.width * (index >= productIndex ? 0 : 1);
			}, 0)
		);
		return `translate(${offsetX}, 0)`;
	}

	private onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const frameBeamWidth = Number(event.target.value);
		this.setState({frameBeamWidth: isNaN(frameBeamWidth) ? this.state.frameBeamWidth : frameBeamWidth});
	};
};
