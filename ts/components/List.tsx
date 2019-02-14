import React from "react";
import { throttle } from "lodash-es";
import Scroll from "./Scroll";

interface Props<ItemT> {
  width: number;
  height: number;
  data: ItemT[];
  renderItem(item: ItemT): React.ReactNode;
  getItemLayout(
    data: ItemT[],
    index: number
  ): {
    length: number;
    offset: number;
    index: number;
  };
  keys(item: ItemT, index: number): string | number;
}

class List<T> extends React.PureComponent<Props<T>> {
  public state = {
    scrollY: 0
  };

  get contentHeight() {
    if (this.props.data.length === 0) return 0;
    const lastIndex = this.props.data.length - 1;
    const { offset, length } = this.props.getItemLayout(
      this.props.data,
      lastIndex
    );
    return offset + length;
  }

  public render() {
    return (
      <Scroll
        height={this.props.height}
        width={this.props.width}
        onScroll={this.handleScroll}
        contentHeight={this.contentHeight}
      >
        {this.renderItems()}
      </Scroll>
    );
  }

  private handleScroll = throttle((x: number, y: number) => {
    this.setState({ scrollY: y });
  }, 300);

  private renderItems() {
    const top = -this.state.scrollY;
    return this.props.data.map((item, index) => {
      const { offset, length } = this.props.getItemLayout(
        this.props.data,
        index
      );

      if (offset + length < top - this.props.height * 0.5) return null;
      if (offset > top + this.props.height * 1.5) return null;

      if (index === 0) {
        console.log(offset);
      }

      const position = { x: 0, y: offset };
      return (
        <container key={this.props.keys(item, index)} position={position}>
          {this.props.renderItem(item)}
        </container>
      );
    });
  }
}

export default List;
