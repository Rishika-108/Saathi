import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";

const InsightModal = ({ journalId, onClose }) => {
  const modalRef = useRef(null);
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch AI insights on mount
  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.post(`/api/journal/analysis/${journalId}`);
        setInsight(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch insights. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (journalId) fetchInsight();

    // Disable scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [journalId]);

  // Trap focus and close on ESC
  useEffect(() => {
    if (modalRef.current) modalRef.current.focus();
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    const selectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = modalRef.current;
    if (!modal) return;
    const elements = modal.querySelectorAll(selectors);
    const first = elements[0], last = elements[elements.length - 1];
    const handleTab = (e) => {
      if (e.key !== "Tab" || elements.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    modal.addEventListener("keydown", handleTab);
    return () => modal.removeEventListener("keydown", handleTab);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
      >
        <motion.div
          ref={modalRef}
          className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-[#e0d4b7] p-6"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          tabIndex={0}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition p-2 rounded-full hover:bg-red-100"
            aria-label="Close insight modal"
          >
            <X size={22} />
          </button>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#a1866f] mb-4"></div>
              <p className="text-[#4a3f35] font-semibold">Loading insights...</p>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center py-10">{error}</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#4a3f35] font-serif mb-1">
                {insight?.title || "Insight Summary"}
              </h2>
              <p className="text-sm text-[#8b7e70] font-mono mb-4">{insight?.date}</p>

              {insight?.description && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#4a3f35] mb-1">Journal Context</h3>
                  <p className="text-[#3f2e20]">{insight.description}</p>
                </div>
              )}

              <hr className="border-[#e0d4b7] my-4" />

              {insight?.issue && (
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-[#a1866f] mb-1">🧩 Core Issue</h3>
                  <p className="text-[#3f2e20]">{insight.issue}</p>
                </div>
              )}
              {insight?.scene && (
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-[#a1866f] mb-1">🎭 Situation or Scene</h3>
                  <p className="text-[#3f2e20]">{insight.scene}</p>
                </div>
              )}
              {insight?.solution && (
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-[#a1866f] mb-1">🌱 Suggested Solution</h3>
                  <p className="text-[#3f2e20]">{insight.solution}</p>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-[#a1866f] hover:bg-[#8b715b] text-white rounded-lg font-semibold shadow-md transition-all"
                >
                  Got it
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InsightModal;
