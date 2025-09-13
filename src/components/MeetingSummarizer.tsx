import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, MessageSquareText, FileText } from "lucide-react";

const MeetingSummarizer = () => {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      setSummary("❌ Error generating summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gradient-primary">
            AI Meeting Summarizer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your meeting transcripts into concise, actionable summaries with AI-powered intelligence
          </p>
        </div>

        {/* Main Card */}
        <Card className="backdrop-blur-sm bg-card/95 border-border/50 shadow-xl">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquareText className="w-5 h-5 text-primary" />
              Meeting Transcript
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Section */}
            <div className="space-y-3">
              <Label htmlFor="transcript" className="text-sm font-medium">
                Paste your meeting transcript below
              </Label>
              <Textarea
                id="transcript"
                className="min-h-[200px] resize-none bg-input border-input-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste your meeting transcript here... The AI will analyze the content and generate a comprehensive summary with key points, action items, and important decisions."
              />
            </div>

            {/* Action Button */}
            <Button
              variant="ai"
              size="lg"
              className="w-full"
              onClick={handleSummarize}
              disabled={loading || !transcript.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Analyzing transcript...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate AI Summary
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Summary Output */}
        {summary && (
          <Card className="backdrop-blur-sm bg-card-secondary/95 border-border/50 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="w-5 h-5 text-success" />
                AI-Generated Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="whitespace-pre-line text-foreground/90 leading-relaxed">
                  {summary}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Powered by advanced AI • Secure & Private • Fast Processing</p>
        </div>
      </div>
    </div>
  );
};

export default MeetingSummarizer;