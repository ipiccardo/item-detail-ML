import "@testing-library/jest-dom";

// Mock window.location
delete window.location;
window.location = {
  href: "http://localhost:3000",
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
};
