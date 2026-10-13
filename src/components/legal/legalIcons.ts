import {
  AlertTriangle, Bell, CreditCard, Database, Eye, FileText, Globe, Info, Lock, Mail,
  MessageSquare, Package, RefreshCw, Scale, Shield, ShoppingCart, Truck, UserCheck,
  type LucideIcon,
} from "lucide-react";

/** Icons the admin can pick for a legal-page section (stored by name). */
export const LEGAL_ICONS: Record<string, LucideIcon> = {
  FileText, Shield, Lock, Eye, Database, Bell, UserCheck, Mail, ShoppingCart, RefreshCw,
  AlertTriangle, Scale, Globe, MessageSquare, Truck, CreditCard, Package, Info,
};

export const legalIcon = (name?: string): LucideIcon => (name && LEGAL_ICONS[name]) || FileText;

/** Section accent colours, cycled in order. */
export const LEGAL_COLORS = ["#e85d26", "#f4a435", "#27ae60", "#6c5ce7", "#e84444"];

export const sectionAnchor = (title: string, i: number) =>
  `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section"}-${i + 1}`;
