import { useState, useEffect, useCallback } from "react";
import { VisitorPanel } from "./components/VisitorPanel";
import { IDCardPanel } from "./components/IDCardPanel";
import { ControlPanel } from "./components/ControlPanel";
import { FeedbackPopup } from "./components/FeedbackPopup";
import { generateScenarios, type Scenario } from "./components/GameData";
import { Shield } from "lucide-react";
import { useRef } from "react";
import warningSound from "../assets/sounds/8_sec_running_out.mp3";
import wrongSound from "../assets/sounds/wrong_answer_sfx.mp3";

export default function App() {
  const [scenarios] = useState<Scenario[]>(() => generateScenarios());
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
    decision: "approve" | "deny";
    reason: string; 
  }>({
    show: false,
    isCorrect: false,
    decision: "approve",
    reason: "",
  });
  const [gameOver, setGameOver] = useState(false);

  const currentScenario = scenarios[currentScenarioIndex];
  const TARGET_SCORE = 15;
  const MAX_MISTAKES = 3;
  const [hasPlayedWarning, setHasPlayedWarning] = useState(false);
  const warningAudio = new Audio(warningSound);
  const wrongAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    wrongAudioRef.current = new Audio(wrongSound);
    if (wrongAudioRef.current) {
      wrongAudioRef.current.volume = 1.0;
    }
  }, []);
    

  // Timer countdown
  useEffect(() => {
    if (
      timeRemaining <= 0 ||
      score >= TARGET_SCORE ||
      mistakes >= MAX_MISTAKES
    ) {
      setGameOver(true);
      return;
    }

    // 🔊 Play warning sound at 10 seconds
    if (timeRemaining === 8 && !hasPlayedWarning) {
      warningAudio.play();
      setHasPlayedWarning(true);
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, score, mistakes, hasPlayedWarning]);

  const handleDecision = useCallback(
    (decision: "approve" | "deny") => {
      if (isProcessing || gameOver) return;

      setIsProcessing(true);

      const scenario = currentScenario;

      const nameMatch = scenario.visitor.name === scenario.idCard.name;
      const ageMatch = scenario.visitor.age === scenario.idCard.age;
      const isValidStatus = scenario.idCard.status === "Valid";

      const isValid = nameMatch && ageMatch && isValidStatus;

      const isCorrect =
        (decision === "approve" && isValid) ||
        (decision === "deny" && !isValid);

      // Determine mistake reason
      let mistakeReason = "";

      if (!isCorrect) {
        if (decision === "approve") {
          // Player approved but shouldn't have
          if (!nameMatch) {
            mistakeReason = "You approved a visitor with a mismatched name.";
          } else if (!ageMatch) {
            mistakeReason = "You approved a visitor with incorrect age details.";
          } else if (!isValidStatus) {
            mistakeReason = "You approved an expired ID.";
          }
        } else {
          // Player denied but shouldn't have
          mistakeReason = "You denied a valid visitor.";
        }
      }

      if (isCorrect) {
        setScore((prev) => {
          const newScore = prev + 1;

          if (newScore >= TARGET_SCORE) {
            setGameOver(true);
          }

          return newScore;
        });
      } else {
        //PLAY WRONG SOUND HERE
        wrongAudioRef.current?.pause();
        wrongAudioRef.current!.currentTime = 0;
        wrongAudioRef.current?.play();

        setMistakes((prev) => {
          const newMistakes = prev + 1;

          if (newMistakes >= MAX_MISTAKES) {
            setGameOver(true);
          }

          return newMistakes;
        });
      }

      setFeedback({
        show: true,
        isCorrect,
        decision,
        reason: mistakeReason, 
      });

      // Move to next scenario after feedback
      setTimeout(() => {
        setCurrentScenarioIndex((prev) => prev + 1);
        setIsProcessing(false);
      }, 2500);
    },
    [currentScenario, isProcessing, gameOver]
  );

  const handleApprove = () => handleDecision("approve");
  const handleDeny = () => handleDecision("deny");

  const closeFeedback = () => {
    setFeedback((prev) => ({ ...prev, show: false }));
  };

  const restartGame = () => {
    setCurrentScenarioIndex(0);
    setTimeRemaining(180);
    setScore(0);
    setMistakes(0);
    setHasPlayedWarning(false);
    setGameOver(false);
    setFeedback({
    show: false,
    isCorrect: false,
    decision: "approve",
    reason: "",
    });
  };

  if (gameOver || currentScenarioIndex >= scenarios.length) {
    const finalScore = score;
    const totalVisitors = TARGET_SCORE; 
    const accuracy = Math.round((finalScore / totalVisitors) * 100);

    const gameOverReason = mistakes >= MAX_MISTAKES 
      ? "Too many mistakes! Review the scenarios and try again."
      : "Time’s up or training complete.";

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border-2 border-cyan-500/30 shadow-2xl p-12 text-center">
          <div className="mb-6">
            <Shield className="w-20 h-20 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Game Over</h1>
            <p className="text-cyan-400/70">{gameOverReason}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/20">
              <p className="text-xs text-cyan-400/70 uppercase tracking-wider mb-2">Score</p>
              <p className="text-4xl font-bold text-white">
                {finalScore}<span className="text-cyan-400/50">/{totalVisitors}</span>
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/20">
              <p className="text-xs text-cyan-400/70 uppercase tracking-wider mb-2">Accuracy</p>
              <p className="text-4xl font-bold text-cyan-400">{accuracy}%</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/20">
              <p className="text-xs text-cyan-400/70 uppercase tracking-wider mb-2">Mistakes</p>
              <p className="text-4xl font-bold text-amber-400">{mistakes}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xl text-white mb-2">
              {accuracy >= 90 ? "Excellent Performance!" : accuracy >= 70 ? "Good Work!" : "Keep Training!"}
            </p>
            <p className="text-cyan-400/70">
              {accuracy >= 90
                ? "You're ready for advanced security operations"
                : accuracy >= 70
                ? "You have solid security assessment skills"
                : "Review the scenarios and try again"}
            </p>
          </div>

          <button
            onClick={restartGame}
            className="px-8 py-4 bg-gradient-to-br from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 rounded-lg border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200 text-white font-semibold text-lg"
          >
            Start New Training Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Access Control Challenge</h1>
              <p className="text-cyan-400/70">Security & Network Training System (SeNTs)</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-cyan-400/70">Visitor</p>
            <p className="text-2xl font-bold text-white">
              {currentScenarioIndex + 1} / {scenarios.length}
            </p>
          </div>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-300"
            style={{
              width: `${((currentScenarioIndex + 1) / scenarios.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Main Game Area */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <VisitorPanel visitor={currentScenario.visitor} />
        <IDCardPanel card={currentScenario.idCard} />
      </div>

      {/* Control Panel */}
      <ControlPanel
        timeRemaining={timeRemaining}
        score={score}
        totalVisitors={TARGET_SCORE}
        mistakes={mistakes}
        maxMistakes={MAX_MISTAKES}
        onApprove={handleApprove}
        onDeny={handleDeny}
        isProcessing={isProcessing}
      />

      {/* Feedback Popup */}
      <FeedbackPopup
        show={feedback.show}
        isCorrect={feedback.isCorrect}
        decision={feedback.decision}
        reason={feedback.reason} 
        onClose={closeFeedback}
      />
    </div>
  );
}
