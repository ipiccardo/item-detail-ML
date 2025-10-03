/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductChat } from "@/components/ui/ProductChat";
import { Product } from "@/types/product";

// Mock fetch
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

const mockProduct: Product = {
    id: "123",
    title: "Samsung Galaxy S23",
    description: "Smartphone Samsung",
    price: {
        amount: 899999,
        currency: "ARS",
        originalPrice: 999999,
        discount: 10,
    },
    images: ["/samsung.jpg"],
    rating: { average: 4.5, totalReviews: 100 },
    seller: {
        id: "seller1",
        name: "Samsung Store",
        reputation: 100,
        sales: 5000,
        location: "Capital Federal",
    },
    condition: "new",
    stock: 50,
    shipping: {
        free: true,
        estimatedDays: "2-3",
    },
    paymentMethods: ["credit_card", "debit_card"],
    variants: {},
    brand: "Samsung",
    category: "Celulares",
    model: "S23",
    specifications: {},
};

describe("ProductChat", () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });

    it("should render collapsed state initially", () => {
        render(<ProductChat product={mockProduct} />);

        expect(screen.getByText("Chat con el vendedor")).toBeInTheDocument();
        expect(screen.getByText("¿Tienes dudas?")).toBeInTheDocument();
        expect(screen.getByText("Chatea con nuestro asistente")).toBeInTheDocument();
        expect(screen.getByText("Chatear")).toBeInTheDocument();
    });

    it("should expand chat when button is clicked", () => {
        render(<ProductChat product={mockProduct} />);

        const expandButton = screen.getByText("Chatear");
        fireEvent.click(expandButton);

        expect(screen.getByText(/¡Hola! 👋 Soy tu asistente virtual/)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Escribe tu pregunta...")).toBeInTheDocument();
    });

    it("should collapse chat when X button is clicked", () => {
        render(<ProductChat product={mockProduct} />);

        const expandButton = screen.getByText("Chatear");
        fireEvent.click(expandButton);

        expect(screen.getByText(/¡Hola! 👋 Soy tu asistente virtual/)).toBeInTheDocument();

        const collapseButton = screen.getByRole("button", { name: "Cerrar chat" });
        fireEvent.click(collapseButton);

        expect(screen.queryByText(/¡Hola! 👋 Soy tu asistente virtual/)).not.toBeInTheDocument();
        expect(screen.getByText("¿Tienes dudas?")).toBeInTheDocument();
    });

    it("should display initial bot message with product title", () => {
        render(<ProductChat product={mockProduct} />);

        const expandButton = screen.getByText("Chatear");
        fireEvent.click(expandButton);

        expect(screen.getByText(/¿Tienes alguna pregunta sobre "Samsung Galaxy S23"/)).toBeInTheDocument();
    });

    it("should send message when send button is clicked", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ output: "Respuesta del bot" }),
        } as Response);

        render(<ProductChat product={mockProduct} />);

        const expandButton = screen.getByText("Chatear");
        fireEvent.click(expandButton);

        const input = screen.getByPlaceholderText("Escribe tu pregunta...");
        fireEvent.change(input, { target: { value: "Hola" } });

        const sendButton = screen.getByRole("button", { name: "Enviar mensaje" });
        fireEvent.click(sendButton);

        expect(screen.getByText("Hola")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("Respuesta del bot")).toBeInTheDocument();
        });
    });

    it("should send message when Enter key is pressed", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ output: "Respuesta del bot" }),
        } as Response);

        render(<ProductChat product={mockProduct} />);

        const expandButton = screen.getByText("Chatear");
        fireEvent.click(expandButton);

        const input = screen.getByPlaceholderText("Escribe tu pregunta...");
        fireEvent.change(input, { target: { value: "Test message" } });
        fireEvent.keyPress(input, { key: "Enter", code: "Enter" });

        await waitFor(() => {
            expect(screen.getByText("Test message")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText("Respuesta del bot")).toBeInTheDocument();
        });
    });

    it("should show loading state when sending message", async () => {
        mockFetch.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)));

        render(<ProductChat product={mockProduct} />);

        const expandButton = screen.getByText("Chatear");
        fireEvent.click(expandButton);

        const input = screen.getByPlaceholderText("Escribe tu pregunta...");
        fireEvent.change(input, { target: { value: "Hola" } });

        const sendButton = screen.getByRole("button", { name: "Enviar mensaje" });
        fireEvent.click(sendButton);

        expect(screen.getByText("Hola")).toBeInTheDocument();
        expect(sendButton).toBeDisabled();
    });

    it("should handle API error gracefully", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network error"));

        render(<ProductChat product={mockProduct} />);

        const expandButton = screen.getByText("Chatear");
        fireEvent.click(expandButton);

        const input = screen.getByPlaceholderText("Escribe tu pregunta...");
        fireEvent.change(input, { target: { value: "Hola" } });

        const sendButton = screen.getByRole("button", { name: "Enviar mensaje" });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText(/¡Hola! 👋 Soy tu asistente virtual/)).toBeInTheDocument();
        });
    });

    it("should not send empty messages", () => {
        render(<ProductChat product={mockProduct} />);

        const expandButton = screen.getByText("Chatear");
        fireEvent.click(expandButton);

        const sendButton = screen.getByRole("button", { name: "Enviar mensaje" });
        expect(sendButton).toBeDisabled();

        const input = screen.getByPlaceholderText("Escribe tu pregunta...");
        fireEvent.change(input, { target: { value: "   " } });

        expect(sendButton).toBeDisabled();
    });

    it("should call API with correct payload including product details", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ output: "Respuesta del bot" }),
        } as Response);

        render(<ProductChat product={mockProduct} />);

        const expandButton = screen.getByText("Chatear");
        fireEvent.click(expandButton);

        const input = screen.getByPlaceholderText("Escribe tu pregunta...");
        fireEvent.change(input, { target: { value: "Hola" } });

        const sendButton = screen.getByRole("button", { name: "Enviar mensaje" });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                "https://develop-n8n.n8jgoh.easypanel.host/webhook/d6e4bab8-60ed-4537-b9d1-79cf7c778962/chat",
                expect.objectContaining({
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: expect.stringContaining('"message":"Hola"'),
                })
            );
        });
    });

    it("should apply custom className", () => {
        render(<ProductChat product={mockProduct} className="custom-class" />);

        const container = screen.getByText("Chat con el vendedor").closest(".bg-white");
        expect(container).toHaveClass("custom-class");
    });

    it("should have proper MercadoLibre styling", () => {
        render(<ProductChat product={mockProduct} />);

        const header = screen.getByText("Chat con el vendedor").closest(".bg-yellow-400");
        expect(header).toHaveClass("bg-yellow-400");

        const container = header?.closest(".bg-white");
        expect(container).toHaveClass("bg-white", "rounded-lg", "border", "border-gray-200");
    });
});
