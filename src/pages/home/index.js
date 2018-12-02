import React, {Component} from 'react';
import "./style.css";
import Slider from "react-slick";

class Home extends Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};
		return (
			<Slider {...settings}>
				<div>
					<div className="pageWrapper"><img src="../../statics/bg1.jpg" alt=""/></div>
				</div>
				<div>
					<img src="../../statics/bg2.jpg" alt=""/>
				</div>
				<div>
					<img src="../../statics/bg3.jpg" alt=""/>
				</div>
				<div>
					<img src="../../statics/bg4.jpg" alt=""/>
				</div>

			</Slider>
		);
	}
}

export default Home
