/* eslint-disable max-len */
import React, { useState } from "react";

interface Question {
    id: string;
    question: string;
    answer: string;
    timeAgo: string;
}

interface QuestionsAndAnswersProps {
    className?: string;
}

const mockQuestions: Question[] = [
    {
        id: "1",
        question: "Tiene NFC?",
        answer: "¡Hola! Sí, el producto está disponible y cuenta con tecnología NFC. ¡Esperamos tu compra y quedamos a tu disposición!",
        timeAgo: "Hace 1 hora",
    },
    {
        id: "2",
        question: "¿Qué garantía tiene?",
        answer: "Hola! El producto tiene garantía de fábrica de 12 meses. Saludos!",
        timeAgo: "Hace 2 horas",
    },
    {
        id: "3",
        question: "¿Hacen envíos?",
        answer: "Sí, realizamos envíos a todo el país. El envío es gratis para compras superiores a $50.000",
        timeAgo: "Hace 3 horas",
    },
];

const frequentQuestions = [
    "¿Qué garantía tiene?",
    "¿Tiene stock?",
    "¿Hacen envíos?",
    "¿Es liberado?",
];

export default function QuestionsAndAnswers({ className = "" }: QuestionsAndAnswersProps): React.JSX.Element {
    const [searchQuery, setSearchQuery] = useState("");
    const [newQuestion, setNewQuestion] = useState("");

    const handleSearch = (): void => {
        // Aquí iría la lógica de búsqueda
        // eslint-disable-next-line no-console
        console.log("Buscando:", searchQuery);
    };

    const handleAskQuestion = (): void => {
        // Aquí iría la lógica para enviar la pregunta
        // eslint-disable-next-line no-console
        console.log("Pregunta:", newQuestion);
        setNewQuestion("");
    };

    const handleFrequentQuestion = (question: string): void => {
        setNewQuestion(question);
    };

    return (
        <div className={`bg-white border-t border-gray-200 pt-8 p-6 ${className}`}>
            {/* Title */}
            <h2 className="text-xl font-semibold ml-text-primary mb-4">Preguntas y respuestas</h2>

            {/* Search Bar */}
            <div className="flex gap-2 mb-6">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Escribí una pregunta o palabra clave..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded-l-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>

            {/* Ask Question Section */}
            <div className="mb-6">
                <p className="text-sm ml-text-secondary mb-3">Preguntale al vendedor</p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Escribí tu pregunta..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleAskQuestion}
                        className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Preguntar
                    </button>
                </div>
            </div>

            {/* Frequent Questions */}
            <div className="mb-6">
                <p className="text-sm font-semibold ml-text-primary mb-2">Preguntas frecuentes</p>
                <div className="flex flex-wrap gap-2">
                    {frequentQuestions.map((question, index) => (
                        <button
                            key={index}
                            onClick={() => handleFrequentQuestion(question)}
                            className="text-sm ml-link border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50 transition-colors"
                        >
                            {question}
                        </button>
                    ))}
                </div>
            </div>

            {/* Questions and Answers List */}
            <div className="space-y-4">
                {mockQuestions.map((qa) => (
                    <div key={qa.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <h3 className="text-sm font-semibold ml-text-primary mb-1">{qa.question}</h3>
                        <p className="text-sm ml-text-secondary leading-relaxed mb-2">{qa.answer}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs ml-text-secondary">{qa.timeAgo}</span>
                            <button className="text-xs ml-link hover:underline">Denunciar</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Questions Link */}
            <div className="mt-6 text-center">
                <button className="text-sm ml-link hover:underline">
                    Buscar entre 118 preguntas de esta publicación
                </button>
            </div>

            {/* How to Ask Seller Button */}
            <div className="mt-6 text-center">
                <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors mx-auto">
                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">?</span>
                    </div>
                    ¿Cómo le pregunto al vendedor?
                </button>
            </div>
        </div>
    );
}
