import { CheckCircle, XCircle } from "lucide-react";

interface FeedbackPopupProps {
  show: boolean;
  isCorrect: boolean;
  decision: "approve" | "deny";
  reason: string;
  onClose: () => void;
}

export function FeedbackPopup({
  show,
  isCorrect,
  decision,
  reason,
  onClose,
}: FeedbackPopupProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-slate-900 border-2 border-cyan-500/30 rounded-xl p-8 shadow-2xl text-center max-w-sm w-full">

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          {isCorrect ? (
            <CheckCircle className="w-16 h-16 text-green-400" />
          ) : (
            <XCircle className="w-16 h-16 text-red-400" />
          )}
        </div>

        {/* Result */}
        <h2 className={`text-2xl font-bold mb-2 ${
          isCorrect ? "text-green-400" : "text-red-400"
        }`}>
          {isCorrect ? "Correct Decision" : "Wrong Decision"}
        </h2>

        {/* Player Action */}
        <p className="text-white mb-2">
          You chose:{" "}
          <span className="font-semibold uppercase">
            {decision}
          </span>
        </p>

        {/* System Explanation */}
        <p className="text-cyan-400/70 text-sm mb-4">
          {isCorrect
            ? "Access decision matches verification result."
            : "Access decision does not match verification result."}
        </p>

        {/*Mistake Reason */}
        {!isCorrect && (
          <p className="text-yellow-400 text-sm mt-2 font-medium">
            ⚠ {reason}
          </p>
        )}

        {/* Optional Close Button */}
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );
}