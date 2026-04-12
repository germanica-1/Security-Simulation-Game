import { CheckCircle, XCircle, Clock, Target, AlertTriangle } from "lucide-react";

interface ControlPanelProps {
  timeRemaining: number;
  score: number;
  totalVisitors: number;
  mistakes: number;
  maxMistakes: number; 
  onApprove: () => void;
  onDeny: () => void;
  isProcessing: boolean;
}

export function ControlPanel({
  timeRemaining,
  score,
  totalVisitors,
  mistakes,
  maxMistakes,
  onApprove,
  onDeny,
  isProcessing,
}: ControlPanelProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isLowTime = timeRemaining < 30;
  const isCritical = timeRemaining <= 30;
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-lg border border-cyan-500/20 p-6 shadow-xl">
      <div className="flex items-center justify-between gap-6">
        {/* Stats Section */}
        <div className="flex items-center gap-6">
          {/* Timer */}
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
            isCritical
              ? 'bg-red-500/20 border-red-500 animate-pulse'
              : isLowTime 
              ? 'bg-red-500/10 border-red-500/30' 
              : 'bg-slate-800/50 border-cyan-500/20'
          }`}>
            <Clock className={`w-6 h-6 ${isLowTime ? 'text-red-400' : 'text-cyan-400'}`} />
            <div>
              <p className="text-xs text-cyan-400/70 uppercase tracking-wider">Time</p>
              <p className={`text-2xl font-mono font-bold ${
                isCritical
                  ? 'text-red-500 animate-pulse'
                  : isLowTime
                  ? 'text-red-400'
                  : 'text-white'
              }`}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </p>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-lg border border-cyan-500/20">
            <Target className="w-6 h-6 text-cyan-400" />
            <div>
              <p className="text-xs text-cyan-400/70 uppercase tracking-wider">Score</p>
              <p className="text-2xl font-bold text-white">
                {score}<span className="text-cyan-400/50">/{totalVisitors}</span>
              </p>
            </div>
          </div>

          {/* Mistakes */}
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-lg border border-cyan-500/20">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <div>
              <p className="text-xs text-cyan-400/70 uppercase tracking-wider">Mistakes</p>
              <p className={`text-2xl font-bold ${mistakes === maxMistakes ? 'text-amber-400' : 'text-white'}`}>{mistakes}/{maxMistakes} </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onDeny}
            disabled={isProcessing}
            className="group relative px-8 py-4 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-lg border-2 border-red-500/50 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-red-500/20"
          >
            <div className="flex items-center gap-3">
              <XCircle className="w-7 h-7 text-white" />
              <div className="text-left">
                <p className="text-xs text-red-100/70 uppercase tracking-wider">Access</p>
                <p className="text-2xl font-bold text-white">DENY</p>
              </div>
            </div>
            <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
          </button>

          <button
            onClick={onApprove}
            disabled={isProcessing}
            className="group relative px-8 py-4 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-lg border-2 border-green-500/50 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-green-500/20"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-white" />
              <div className="text-left">
                <p className="text-xs text-green-100/70 uppercase tracking-wider">Access</p>
                <p className="text-2xl font-bold text-white">APPROVE</p>
              </div>
            </div>
            <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
          </button>
        </div>
      </div>
    </div>
  );
}
