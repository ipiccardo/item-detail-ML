/* eslint-disable max-len */
import { useState, useCallback } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface UseChatProps {
  productId?: string;
  productTitle?: string;
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
  addMessage: (text: string, isUser: boolean) => void;
}

export const useChat = ({ productId, productTitle }: UseChatProps): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((text: string, isUser: boolean): void => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const sendMessage = useCallback(
    async (message: string): Promise<void> => {
      if (!message.trim() || isLoading) return;

      // Add user message
      addMessage(message, true);
      setIsLoading(true);

      // Respuestas de fallback inteligentes
      const getFallbackResponse = (userMessage: string): string => {
        const message = userMessage.toLowerCase();

        if (message.includes("hola") || message.includes("hi") || message.includes("hello")) {
          return "¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte con este producto?";
        }

        if (message.includes("precio") || message.includes("cuesta") || message.includes("vale")) {
          return "El precio del producto está claramente indicado en la página. ¿Te interesa conocer más sobre las formas de pago disponibles?";
        }

        if (message.includes("envío") || message.includes("entrega") || message.includes("llegar")) {
          return "Este producto tiene envío gratis. ¿Te gustaría conocer más detalles sobre los tiempos de entrega?";
        }

        if (message.includes("garantía") || message.includes("devolución") || message.includes("cambio")) {
          return "Todos nuestros productos tienen garantía. ¿Te interesa conocer más sobre nuestra política de devoluciones?";
        }

        if (
          message.includes("características") ||
          message.includes("especificaciones") ||
          message.includes("detalles")
        ) {
          return "Puedes encontrar todas las características del producto en la sección de especificaciones. ¿Hay algo específico que te interesa saber?";
        }

        if (message.includes("stock") || message.includes("disponible") || message.includes("hay")) {
          return "El stock disponible se muestra en la página. ¿Te gustaría que te ayude con algo más?";
        }

        // Respuestas generales
        const generalResponses = [
          "¡Gracias por tu mensaje! Estoy aquí para ayudarte con cualquier pregunta sobre este producto.",
          "Entiendo tu consulta. ¿Te gustaría saber más sobre las características del producto?",
          "¡Perfecto! ¿Hay algo específico que te gustaría conocer sobre este artículo?",
          "Gracias por contactarnos. ¿En qué puedo ayudarte hoy?",
          "¡Excelente pregunta! ¿Te interesa conocer más detalles sobre el envío o la garantía?",
          "Estoy aquí para ayudarte. ¿Tienes alguna pregunta específica sobre este producto?",
        ];

        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
      };

      try {
        const response = await fetch(
          "https://develop-n8n.n8jgoh.easypanel.host/webhook/d6e4bab8-60ed-4537-b9d1-79cf7c778962/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message,
              productId,
              productTitle,
              timestamp: new Date().toISOString(),
            }),
          }
        );

        if (!response.ok) {
          // Webhook no disponible, usar fallback directamente
          const smartResponse = getFallbackResponse(message);
          addMessage(smartResponse, false);
          return;
        }

        const data = await response.json();
        const botResponse = data.response ?? getFallbackResponse(message);

        addMessage(botResponse, false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error al enviar mensaje:", error);

        // Usar respuesta inteligente basada en el mensaje del usuario
        const smartResponse = getFallbackResponse(message);
        addMessage(smartResponse, false);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, productId, productTitle, addMessage]
  );

  return {
    messages,
    isLoading,
    sendMessage,
    addMessage,
  };
};
