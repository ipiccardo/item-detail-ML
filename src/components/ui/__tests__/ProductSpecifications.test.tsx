import { render, screen, fireEvent } from "@testing-library/react";
import { ProductSpecifications } from "../ProductSpecifications";

const mockSpecifications = {
  "Pantalla": "6.6 pulgadas Super AMOLED",
  "Resolución": "1080 x 2340 píxeles",
  "Procesador": "Exynos 1480",
  "RAM": "8 GB",
  "Almacenamiento": "256 GB",
  "Cámara principal": "50 MP",
  "Cámara frontal": "32 MP",
  "Batería": "5000 mAh",
  "Sistema operativo": "Android 14",
  "Conectividad": "5G, Wi-Fi 6, Bluetooth 5.3",
  "Peso": "213 g",
  "Dimensiones": "161.1 x 77.4 x 8.2 mm",
};

describe("ProductSpecifications", () => {
  it("should render specifications title", () => {
    render(<ProductSpecifications specifications={mockSpecifications} />);

    expect(screen.getByText("Características del producto")).toBeInTheDocument();
  });

  it("should not render if specifications is empty", () => {
    const { container } = render(<ProductSpecifications specifications={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it("should not render if specifications is undefined", () => {
    const { container } = render(
      <ProductSpecifications specifications={undefined as unknown as { [key: string]: string }} />);
    expect(container.firstChild).toBeNull();
  });

  it("should show expand/collapse button", () => {
    render(<ProductSpecifications specifications={mockSpecifications} />);

    expect(screen.getByText("Ver todas las características")).toBeInTheDocument();
  });

  it("should expand when button is clicked", () => {
    render(<ProductSpecifications specifications={mockSpecifications} />);

    const expandButton = screen.getByText("Ver todas las características");
    fireEvent.click(expandButton);

    expect(screen.getByText("Ver menos")).toBeInTheDocument();
    expect(screen.getByText("Pantalla:")).toBeInTheDocument();
    expect(screen.getByText("6.6 pulgadas Super AMOLED")).toBeInTheDocument();
  });

  it("should collapse when button is clicked again", () => {
    render(<ProductSpecifications specifications={mockSpecifications} />);

    const expandButton = screen.getByText("Ver todas las características");
    fireEvent.click(expandButton);

    const collapseButton = screen.getByText("Ver menos");
    fireEvent.click(collapseButton);

    expect(screen.getByText("Ver todas las características")).toBeInTheDocument();
  });

  it("should show show all button when there are more than 6 specifications", () => {
    render(<ProductSpecifications specifications={mockSpecifications} />);

    const expandButton = screen.getByText("Ver todas las características");
    fireEvent.click(expandButton);

    expect(screen.getByText("Ver todas las 12 características")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <ProductSpecifications specifications={mockSpecifications} className="custom-class" />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("should render all specifications when expanded", () => {
    render(<ProductSpecifications specifications={mockSpecifications} />);

    const expandButton = screen.getByText("Ver todas las características");
    fireEvent.click(expandButton);

    // Click "Ver todas las X características" to show all
    const showAllButton = screen.getByText("Ver todas las 12 características");
    fireEvent.click(showAllButton);

    Object.entries(mockSpecifications).forEach(([key, value]) => {
      expect(screen.getByText(`${key}:`)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});
