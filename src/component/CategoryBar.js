import React from "react";
import { Menu } from "semantic-ui-react";

class CategoryBar extends React.Component {
  render() {
    const categoryArray = this.props.categoryArray;
    return (
      <Menu aria-label="Category Bar" style={{ overflow: "auto" }}>
        <Menu.Item header>Category:</Menu.Item>
        {categoryArray.map(category => (
          <Menu.Item
            name={category}
            key={category}
            active={this.props.activeCategory === category}
            onClick={this.props.updateActiveCategory}
          />
        ))}
      </Menu>
    );
  }
}

export default CategoryBar;
