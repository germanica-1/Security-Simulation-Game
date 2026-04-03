import { User, Shield, Clock } from "lucide-react";

interface VisitorPanelProps {
  visitor: {
    name: string;
    age: number;
    purpose: string;
    avatar: string;
  };
}

export function VisitorPanel({ visitor }: VisitorPanelProps) {
  return (
    <div className="h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-cyan-500/20 p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-500/20">
        <Shield className="w-6 h-6 text-cyan-400" />
        <div>
          <h2 className="text-xl font-semibold text-white">Visitor Checkpoint</h2>
          <p className="text-xs text-cyan-400/70">Security Scan Active</p>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-48 h-48 rounded-lg bg-gradient-to-br from-slate-700 to-slate-600 overflow-hidden border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/20">
            <img
              src={visitor.avatar}
              alt={visitor.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://picsum.photos/200";
              }}
            />
          </div>
          {/* Scanning effect */}
          <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg animate-pulse pointer-events-none" />
        </div>
      </div>

      {/* Visitor Information */}
      <div className="space-y-4">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/10">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400/70 uppercase tracking-wider">Name</span>
          </div>
          <p className="text-xl font-semibold text-white">{visitor.name}</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/10">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400/70 uppercase tracking-wider">Age</span>
          </div>
          <p className="text-xl font-semibold text-white">{visitor.age} years</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/10">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400/70 uppercase tracking-wider">Purpose</span>
          </div>
          <p className="text-base text-white">{visitor.purpose}</p>
        </div>
      </div>

      {/* Status indicator */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-cyan-400/50">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <span>AWAITING VERIFICATION</span>
      </div>
    </div>
  );
}
