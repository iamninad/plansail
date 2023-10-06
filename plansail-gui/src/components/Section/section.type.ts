import { UniqueIdentifier } from "@dnd-kit/core";
import React from "react";

export default interface SectionProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title?: string;
  description?: string;
  onAddItem?: () => void;
}
