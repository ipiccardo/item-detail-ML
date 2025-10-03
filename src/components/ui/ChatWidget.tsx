/* eslint-disable max-len */
"use client";

import { JSX, useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface ChatWidgetProps {
    productId?: string;
    productTitle?: string;
}

export const ChatWidget = ({ productId, productTitle }: ChatWidgetProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte con este producto?",
            isUser: false,
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (): Promise<void> => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputMessage,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage("");
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

            if (message.includes("características") || message.includes("especificaciones") || message.includes("detalles")) {
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
            const response = await fetch("https://develop-n8n.n8jgoh.easypanel.host/webhook/d6e4bab8-60ed-4537-b9d1-79cf7c778962/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: inputMessage,
                    productId,
                    productTitle,
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                // Webhook no disponible, usar fallback directamente
                const smartResponse = getFallbackResponse(inputMessage);
                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: smartResponse,
                    isUser: false,
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, botMessage]);
                return;
            }

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response ?? getFallbackResponse(inputMessage),
                isUser: false,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error al enviar mensaje:", error);

            // Usar respuesta inteligente basada en el mensaje del usuario
            const smartResponse = getFallbackResponse(inputMessage);

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: smartResponse,
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent): void => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void sendMessage();
        }
    };

    return (
        <>
            {/* Chat Button - Fixed Position */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Abrir chat"
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-end p-4 lg:items-center lg:justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Chat Container */}
                    <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md h-[600px] flex flex-col">
                        {/* Header */}
                        <div className="bg-yellow-400 p-4 rounded-t-lg flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Asistente Virtual</h3>
                                    <p className="text-xs text-gray-600">Te ayudo con tus dudas</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-600 hover:text-gray-800 transition-colors"
                                aria-label="Cerrar chat"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg p-3 ${message.isUser
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        <div className="flex items-start gap-2">
                                            {!message.isUser && (
                                                <Bot className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                                            )}
                                            {message.isUser && (
                                                <User className="w-4 h-4 mt-0.5 text-blue-200 flex-shrink-0" />
                                            )}
                                            <div className="flex-1">
                                                <p className="text-sm leading-relaxed">{message.text}</p>
                                                <p className="text-xs opacity-70 mt-1">
                                                    {message.timestamp.toLocaleTimeString("es-AR", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                                        <div className="flex items-center gap-2">
                                            <Bot className="w-4 h-4 text-gray-500" />
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Escribe tu mensaje..."
                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={() => void sendMessage()}
                                    disabled={!inputMessage.trim() || isLoading}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                                    aria-label="Enviar mensaje"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
