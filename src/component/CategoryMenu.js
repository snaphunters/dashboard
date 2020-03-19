import React from "react";
import { Input, Container } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
//
const populateCategories = categoryArray => {
  if (categoryArray.length >= 1) {
    return categoryArray.map((category, ind) => {
      return (
        <option
          key={uuidv4()}
          value={category}
          aria-label={`Category Option ${ind}`}
        />
      );
    });
  }
  return;
};

const CategoryMenu = ({ categoryArray, category, updateCategory }) => {
  return (
    <Container>
      <Input
        label="Category"
        list="categories"
        placeholder="Select/Type category..."
        onChange={e => updateCategory(e.target.value)}
        aria-label="CategoryDropDown"
        value={category}
      />
      <datalist id="categories">{populateCategories(categoryArray)}</datalist>
    </Container>
  );
};

export default CategoryMenu;
