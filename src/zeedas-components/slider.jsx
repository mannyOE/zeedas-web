import React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

const items = [
  {
    id: 1,
    altText:
      "Collaboration has never been this easy. Natterbase comes with a built-in code review system that allows your software engineers to collaborate with each other in real-time",
    caption: "Collaborative code review system",
  },
  {
    id: 2,
    altText:
      "Breakdown features into code interface that allows you to separate concerns and break down huge complexities into tiny independent concerns that can be worked on in parallel.",
    caption: "Ship faster with precise planning",
  },
  {
    id: 3,
    altText:
      "There is a better way to build products and manage your team work in the best way possible.  Zeedas creates efficiency at all levels of your operation.Accurately Predict Product timelines. No more missing deadlines.",
    caption: "Build better, faster and smarter.",
  },
];

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      animating: false,
    };
  }

  previous = () => {
    const { animating, activeIndex } = this.state;

    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    this.setActiveIndex(nextIndex);
  };

  next = () => {
    const { animating, activeIndex } = this.state;

    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    this.setActiveIndex(nextIndex);
  };

  goToIndex = (newIndex) => {
    const { animating } = this.state;

    if (animating) return;
    this.setActiveIndex(newIndex);
  };

  setActiveIndex = (nextIndex) => {
    this.setState({ activeIndex: nextIndex });
  };

  setAnimating = (animatingStatus) => {
    this.setState({ animating: animatingStatus });
  };

  render() {
    const slides = items.map((item) => (
      <CarouselItem
        className="carousel-item"
        tag="div"
        key={item.id}
        onExiting={() => this.setAnimating(true)}
        onExited={() => this.setAnimating(false)}
      >
        <CarouselCaption
          className=""
          captionText={item.altText}
          captionHeader={item.caption}
        />
      </CarouselItem>
    ));

    return (
      <div>
        <Carousel
          activeIndex={this.state.activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={items}
            activeIndex={this.state.activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
        </Carousel>
      </div>
    );
  }
}

export default Slider;
