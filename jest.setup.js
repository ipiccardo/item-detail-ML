import "@testing-library/jest-dom";

// Mock window.location
const mockLocation = {
  href: "http://localhost:3000",
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
};

window.location = mockLocation;
