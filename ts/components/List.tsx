import React from "react";
import { throttle } from "lodash-es";
import Scroll from "./Scroll";

interface Props<ItemT> {
  width: number;
  height: number;
  data: ItemT[];
  renderItem(item: ItemT): React.ReactNode;
  initialNumToRender?: number;
  getItemLayout(
    data: ItemT[],
    index: number
  ): {
    length: number;
    offset: number;
    index: number;
  };
  keyExtractor(item: ItemT, index: number): string | number;
}

interface VItem<T> {
  key: string | number;
  item: T;
  index: number;
  position: { x: number; y: number };
}

interface State<T> {
  vList: VItem<T>[];
}

class List<T> extends React.PureComponent<Props<T>, State<T>> {
  constructor(props: Props<T>) {
    super(props);
    this.initState();
  }

  private initState() {
    const vList = [];
    const {
      data,
      initialNumToRender = 10,
      getItemLayout,
      keyExtractor
    } = this.props;

    let index = 0;
    while (index < initialNumToRender) {
      const item = data[index];
      const y = getItemLayout(data, index).offset;
      vList.push({
        item,
        index,
        key: keyExtractor(item, index),
        position: { x: 0, y }
      });
      index += 1;
    }
    this.state = { vList };
  }

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

  private lastIndex = 0;

  private handleScroll = throttle((x: number, y: number) => {
    const { data } = this.props;
    const vList: VItem<T>[] = [];
    const top = -y - this.props.height / 2;
    const bottom = -y + this.props.height * (3 / 2);

    let index1 = this.lastIndex;
    let index2 = this.lastIndex - 1;

    // 向后找
    while (index1 < data.length) {
      const item = data[index1];
      const { offset, length } = this.props.getItemLayout(data, index1);
      if (offset + length > top) {
        vList.push({
          key: this.props.keyExtractor(item, index1),
          item,
          index: index1,
          position: { x: 0, y: offset }
        });
      }
      if (offset > bottom) {
        break;
      }
      index1 += 1;
    }

    // 向前找
    while (index2 >= 0) {
      const item = data[index2];
      const { offset, length } = this.props.getItemLayout(data, index2);
      if (offset + length > top) {
        vList.unshift({
          key: this.props.keyExtractor(item, index2),
          item,
          index: index2,
          position: { x: 0, y: offset }
        });
      } else {
        break;
      }
      index2 -= 1;
    }
    this.lastIndex = Math.ceil((index1 + index2) / 2);
    this.setState({ vList });
  }, 300);

  private renderItems() {
    return this.state.vList.map(({ item, key, position }) => {
      return (
        <container key={key} position={position}>
          {this.props.renderItem(item)}
        </container>
      );
    });
  }
}

export default List;
