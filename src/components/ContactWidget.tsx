import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X, Plus, Send } from "lucide-react";

const PHONE_NUMBER = "917567350328";
const FORMATTED_PHONE = "+91 75673 50328";

const QUICK_MESSAGES = [
  { id: 1, text: "Order Smoothie Mix", emoji: "🥤" },
  { id: 2, text: "Order Freeze Fusion Chocolates", emoji: "🍫" },
  { id: 3, text: "Order Fruit Chunks", emoji: "🍓" },
  { id: 4, text: "View Best Sellers", emoji: "🔥" },
  { id: 5, text: "View Prices & Offers", emoji: "💸" },
  { id: 6, text: "Wholesale / bulk order inquiry", emoji: "🤝" },
  { id: 7, text: "Do you deliver to my location?", emoji: "📍" },
];

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const handleWhatsAppSend = () => {
    const finalMessage = customMessage || selectedMessage || "Hello! I'm interested in your products.";
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, "_blank");
    setShowWhatsAppModal(false);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {/* Action Buttons Group */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="flex flex-col items-end gap-3 mb-2"
          >
            {/* WhatsApp Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowWhatsAppModal(true)}
              className="flex items-center gap-2 group"
            >
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-semibold text-[#1a1a1a] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                WhatsApp Chat
              </span>
              <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-[#25D366]/40 transition-shadow">
                <MessageCircle size={24} fill="currentColor" />
              </div>
            </motion.button>

            {/* Call Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open(`tel:${PHONE_NUMBER}`)}
              className="flex items-center gap-2 group"
            >
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-semibold text-[#1a1a1a] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Voice Call
              </span>
              <div className="w-12 h-12 bg-[#f4a435] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-[#f4a435]/40 transition-shadow">
                <Phone size={24} fill="currentColor" />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 ${
          isOpen ? "bg-[#1a1a1a]" : "bg-[#e85d26]"
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Plus size={32} />
        </motion.div>
      </motion.button>

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {showWhatsAppModal && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm z-[10000]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#1a1a1a] border border-[#f4a435]/20 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#e85d26] to-[#f4a435] p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="text-[#e85d26]" size={28} />
                  </div>
                  <div>
                    <h3 className="text-white font-serif text-xl font-bold leading-tight">WhatsApp Chat</h3>
                    <p className="text-white/80 text-xs">Usually responds in a few minutes</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowWhatsAppModal(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-[#f4a435] text-xs font-semibold uppercase tracking-wider mb-4">Quick Messages</h4>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                    {QUICK_MESSAGES.map((msg) => (
                      <button
                        key={msg.id}
                        onClick={() => {
                          setSelectedMessage(msg.text);
                          setCustomMessage("");
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl text-sm transition-all duration-200 border ${
                          selectedMessage === msg.text
                            ? "bg-[#f4a435]/10 border-[#f4a435] text-white"
                            : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{msg.emoji}</span>
                          <span className="flex-1">{msg.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[#f4a435] text-xs font-semibold uppercase tracking-wider mb-2">Custom Message</h4>
                  <textarea
                    value={customMessage}
                    onChange={(e) => {
                      setCustomMessage(e.target.value);
                      setSelectedMessage("");
                    }}
                    placeholder="Type your question here..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#f4a435]/40 focus:border-[#f4a435] transition-all resize-none min-h-[100px] placeholder:text-gray-600"
                  />
                </div>

                <button
                  onClick={handleWhatsAppSend}
                  className="w-full py-4 bg-gradient-to-r from-[#e85d26] to-[#f4a435] text-white font-bold rounded-2xl shadow-lg hover:shadow-[#e85d26]/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
                >
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  Send via WhatsApp
                </button>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-black/20 text-center">
                <p className="text-[10px] text-gray-500 font-medium">
                  Official Contact: <span className="text-gray-400">{FORMATTED_PHONE}</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(244, 164, 53, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(244, 164, 53, 0.4);
        }
      `}} />
    </div>
  );
}
