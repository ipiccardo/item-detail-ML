/* eslint-disable max-len */
import React from "react";

export interface GuaranteeItem {
  icon: React.ReactNode;
  text: string;
}

const createTruckIcon = (): React.ReactNode =>
  React.createElement(
    "svg",
    {
      className: "w-4 h-4 text-blue-500",
      fill: "currentColor",
      viewBox: "0 0 20 20",
    },
    React.createElement("path", {
      d: "M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
    }),
    React.createElement("path", {
      d: "M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z",
    })
  );

const createShieldIcon = (): React.ReactNode =>
  React.createElement(
    "svg",
    {
      className: "w-4 h-4 text-blue-500",
      fill: "currentColor",
      viewBox: "0 0 20 20",
    },
    React.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
      clipRule: "evenodd",
    })
  );

export const getDefaultGuarantees = (): GuaranteeItem[] => [
  {
    icon: createTruckIcon(),
    text: "Devolución gratis. Tenés 30 días desde que lo recibís.",
  },
  {
    icon: createShieldIcon(),
    text: "Compra Protegida, recibí el producto que esperabas o te devolvemos tu dinero.",
  },
];
