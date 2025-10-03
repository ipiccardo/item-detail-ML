/* eslint-disable quotes */
/* eslint-disable max-len */
"use client";

import { JSX, useState } from "react";
import { MessageCircle, Send, Bot, User, X } from "lucide-react";
import { Product } from "@/types/product";

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface ProductChatProps {
    product: Product;
    className?: string;
}

export const ProductChat = ({ product, className = "" }: ProductChatProps): JSX.Element => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: `¡Hola! 👋 Soy tu asistente virtual. ¿Tienes alguna pregunta sobre "${product.title}"?`,
            isUser: false,
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
                return `¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte con "${product.title}"?`;
            }

            if (message.includes("precio") || message.includes("cuesta") || message.includes("vale")) {
                return `El precio de este ${product.brand} está claramente indicado en la página. ¿Te interesa conocer más sobre las formas de pago disponibles?`;
            }

            if (message.includes("envío") || message.includes("entrega") || message.includes("llegar")) {
                return `Este ${product.category} tiene envío gratis. ¿Te gustaría conocer más detalles sobre los tiempos de entrega?`;
            }

            if (message.includes("garantía") || message.includes("devolución") || message.includes("cambio")) {
                return `Todos nuestros productos ${product.brand} tienen garantía. ¿Te interesa conocer más sobre nuestra política de devoluciones?`;
            }

            if (message.includes("características") || message.includes("especificaciones") || message.includes("detalles")) {
                return `Puedes encontrar todas las características de este ${product.title} en la sección de especificaciones. ¿Hay algo específico que te interesa saber?`;
            }

            if (message.includes("stock") || message.includes("disponible") || message.includes("hay")) {
                return `El stock disponible de este ${product.category} se muestra en la página. ¿Te gustaría que te ayude con algo más?`;
            }

            // Respuestas generales con contexto del producto
            const generalResponses = [
                `¡Gracias por tu mensaje sobre "${product.title}"! Estoy aquí para ayudarte con cualquier pregunta.`,
                `Entiendo tu consulta sobre este ${product.brand}. ¿Te gustaría saber más sobre las características?`,
                `¡Perfecto! ¿Hay algo específico que te gustaría conocer sobre este ${product.category}?`,
                `Gracias por contactarnos sobre "${product.title}". ¿En qué puedo ayudarte hoy?`,
                `¡Excelente pregunta! ¿Te interesa conocer más detalles sobre el envío o la garantía de este producto?`,
                `Estoy aquí para ayudarte con "${product.title}". ¿Tienes alguna pregunta específica?`,
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
                    productId: product.id,
                    productTitle: product.title,
                    productPrice: product.price.amount,
                    productBrand: product.brand,
                    productCategory: product.category,
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
        <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
            {/* Header */}
            <div className="bg-yellow-400 p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Chat con el vendedor</h3>
                            <p className="text-xs text-gray-600">Resuelve tus dudas al instante</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                        aria-label={isExpanded ? "Cerrar chat" : "Expandir chat"}
                    >
                        {isExpanded ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Chat Content */}
            {isExpanded && (
                <div className="p-4">
                    {/* Messages */}
                    <div className="h-64 overflow-y-auto space-y-3 mb-4 border border-gray-200 rounded-lg p-3">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-lg p-2 ${message.isUser
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    <div className="flex items-start gap-2">
                                        {!message.isUser && (
                                            <Bot className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                                        )}
                                        {message.isUser && (
                                            <User className="w-3 h-3 mt-1 text-blue-200 flex-shrink-0" />
                                        )}
                                        <div className="flex-1">
                                            <p className="text-xs leading-relaxed">{message.text}</p>
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
                                <div className="bg-gray-100 rounded-lg p-2 max-w-[85%]">
                                    <div className="flex items-center gap-2">
                                        <Bot className="w-3 h-3 text-gray-500" />
                                        <div className="flex space-x-1">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Escribe tu pregunta..."
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
            )}

            {/* Collapsed State */}
            {!isExpanded && (
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">¿Tienes dudas?</p>
                                <p className="text-xs text-gray-600">Chatea con nuestro asistente</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            Chatear
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
