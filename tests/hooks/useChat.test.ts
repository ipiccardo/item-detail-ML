/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import { renderHook, act } from "@testing-library/react";
import { useChat } from "@/hooks/useChat";

// Mock fetch
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("useChat", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should initialize with default bot message", () => {
    const { result } = renderHook(() => useChat({ productId: "123", productTitle: "Test Product" }));

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].text).toBe("¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte?");
    expect(result.current.messages[0].isUser).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it("should add message correctly", () => {
    const { result } = renderHook(() => useChat({ productId: "123", productTitle: "Test Product" }));

    act(() => {
      result.current.addMessage("Test message", true);
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[1].text).toBe("Test message");
    expect(result.current.messages[1].isUser).toBe(true);
  });

  it("should send message successfully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ output: "Bot response" }),
    } as Response);

    const { result } = renderHook(() => useChat({ productId: "123", productTitle: "Test Product" }));

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(result.current.messages).toHaveLength(3); // Initial + user + bot
    expect(result.current.messages[1].text).toBe("Hello");
    expect(result.current.messages[1].isUser).toBe(true);
    expect(result.current.messages[2].text).toBe("Bot response");
    expect(result.current.messages[2].isUser).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle API error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useChat({ productId: "123", productTitle: "Test Product" }));

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(result.current.messages).toHaveLength(3); // Initial + user + error
    expect(result.current.messages[1].text).toBe("Hello");
    expect(result.current.messages[1].isUser).toBe(true);
    expect(result.current.messages[2].text).toBe(
      "¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte con este producto?"
    );
    expect(result.current.messages[2].isUser).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle API response without output field", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Bot response" }),
    } as Response);

    const { result } = renderHook(() => useChat({ productId: "123", productTitle: "Test Product" }));

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[2].text).toBe(
      "¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte con este producto?"
    );
    expect(result.current.messages[2].isUser).toBe(false);
  });

  it("should not send empty messages", async () => {
    const { result } = renderHook(() => useChat({ productId: "123", productTitle: "Test Product" }));

    await act(async () => {
      await result.current.sendMessage("");
    });

    expect(result.current.messages).toHaveLength(1); // Only initial message
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should not send messages when loading", async () => {
    mockFetch.mockImplementationOnce(() => new Promise((resolve) => setTimeout(resolve, 100)));

    const { result } = renderHook(() => useChat({ productId: "123", productTitle: "Test Product" }));

    // Start first message
    act(() => {
      void result.current.sendMessage("First message");
    });

    expect(result.current.isLoading).toBe(true);

    // Try to send second message while loading
    await act(async () => {
      await result.current.sendMessage("Second message");
    });

    expect(mockFetch).toHaveBeenCalledTimes(1); // Only first call
  });

  it("should call API with correct payload", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ output: "Bot response" }),
    } as Response);

    const { result } = renderHook(() => useChat({ productId: "123", productTitle: "Test Product" }));

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://develop-n8n.n8jgoh.easypanel.host/webhook/d6e4bab8-60ed-4537-b9d1-79cf7c778962/chat",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: expect.stringContaining('"message":"Hello"'),
      })
    );
  });

  it("should handle API response with non-ok status", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    const { result } = renderHook(() => useChat({ productId: "123", productTitle: "Test Product" }));

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[2].text).toBe(
      "¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte con este producto?"
    );
    expect(result.current.messages[2].isUser).toBe(false);
  });
});
