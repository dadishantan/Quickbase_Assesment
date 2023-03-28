
import { render, screen, fireEvent } from "@testing-library/react";
import FieldBuilder from "../src/components/Form";

describe("FieldBuilder component", () => {
  beforeEach(() => {
    render(<FieldBuilder />);
  });

  it("should render label input", () => {
    const labelInput = screen.getByLabelText(/label:/i);
    expect(labelInput).toBeInTheDocument();
  });

  it("should render submit button", () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("should add a new item to the list when the add button is clicked", () => {
    const addButton = screen.getByRole("button", { name: /add/i });
    const input = screen.getByPlaceholderText(/new item/i);

    fireEvent.change(input, { target: { value: "Yellow" } });
    fireEvent.click(addButton);

    const itemList = screen.getByRole("list");
    const newItem = screen.getByText(/yellow/i);
    expect(newItem).toBeInTheDocument();
    expect(itemList).toContainElement(newItem);
  });

  it("should remove an item from the list when the remove button is clicked", () => {
    const addButton = screen.getByRole("button", { name: /add/i });
    const input = screen.getByPlaceholderText(/new item/i);

    fireEvent.change(input, { target: { value: "Yellow" } });
    fireEvent.click(addButton);

    const itemList = screen.getByRole("list");
    const newItem = screen.getByText(/yellow/i);
    expect(newItem).toBeInTheDocument();
    expect(itemList).toContainElement(newItem);

    const removeButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(newItem);

    expect(itemList).not.toContainElement(newItem);
  });

  it("should submit the form when the submit button is clicked", () => {
    const labelInput = screen.getByLabelText(/label:/i);
    const defaultValueInput = screen.getByPlaceholderText(/default value/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(labelInput, { target: { value: "Name" } });
    fireEvent.change(defaultValueInput, { target: { value: "Red" } });
    fireEvent.click(submitButton);

    const preview = screen.getByRole("textbox");
    expect(preview).toHaveTextContent(
      JSON.stringify(
        { name: "Name", defaultValue: "Red", items: ["Red", "Green", "Blue"] },
        null,
        2
      )
    );
  });
});
