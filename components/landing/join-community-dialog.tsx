"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2, Radio, Send, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface JoinCommunityDialogProps {
  children: React.ReactNode;
  defaultHeading?: string;
  defaultDescription?: string;
}

export function JoinCommunityDialog({
  children,
  defaultHeading = "Join the Gruxz Community",
  defaultDescription = "Create your gamer profile to squad up, join voice & text chatrooms, and start streaming.",
}: JoinCommunityDialogProps) {
  const [gamerTag, setGamerTag] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gamerTag.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setSubmitted(false);
        setGamerTag("");
        setEmail("");
      }, 200);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md border-[#8f00ff]/50 bg-[#121216]">
        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gruxz-badge-radial">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <DialogTitle>Welcome to Gruxz, {gamerTag}!</DialogTitle>
            <DialogDescription>
              Your invite pass has been sent to{" "}
              <span className="text-white font-semibold">{email}</span>. Jump
              into active lobbies and start streaming right away.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="mb-1">
                <Badge variant="default">GRUXZ ACCESS PASS</Badge>
              </div>
              <DialogTitle>{defaultHeading}</DialogTitle>
              <DialogDescription>{defaultDescription}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-1">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="gamer-tag"
                  className="font-heading text-sm font-bold uppercase tracking-wide text-[#dad7d7]"
                >
                  Gamer Tag
                </label>
                <Input
                  id="gamer-tag"
                  placeholder="e.g. ShadowViper_99"
                  value={gamerTag}
                  onChange={(e) => setGamerTag(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="gamer-email"
                  className="font-heading text-sm font-bold uppercase tracking-wide text-[#dad7d7]"
                >
                  Email Address
                </label>
                <Input
                  id="gamer-email"
                  type="email"
                  placeholder="you@gruxz.gg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <DialogFooter className="mt-2 sm:justify-stretch">
                <Button type="submit" className="w-full h-12 text-lg">
                  Claim Your Spot
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface StreamPlayerDialogProps {
  children: React.ReactNode;
}

export function StreamPlayerDialog({ children }: StreamPlayerDialogProps) {
  const [chatMessage, setChatMessage] = React.useState("");
  const [messages, setMessages] = React.useState([
    { user: "Nyxblade", text: "What a clutch round!!" },
    { user: "KiroGG", text: "Crosshair placement is insane 🔥" },
    { user: "Vortex_X", text: "Drop your lobby code after this match!" },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessages((prev) => [...prev, { user: "You", text: chatMessage.trim() }]);
    setChatMessage("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl p-4 sm:p-6 border-[#8f00ff]/50 bg-[#101014]">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="live">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              LIVE NOW
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#dad7d7]">
              <Users className="h-4 w-4 text-[#ba62ff]" />
              14,820 watching
            </span>
          </div>
          <DialogTitle className="mt-1">
            Gruxz Championship Arena — Top Pick Stream
          </DialogTitle>
          <DialogDescription>
            Featured community broadcast • 1080p60 Low-Latency Stream
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 relative aspect-[719/413] rounded-xl border border-white/10 bg-black">
            <Image
              src="/images/stream-thumbnail.png"
              alt="Live esports tournament stream"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
              <div className="flex items-center justify-between w-full">
                <div>
                  <p className="font-heading font-bold text-white text-lg">
                    Team Phantom vs. Apex Raiders
                  </p>
                  <p className="text-xs text-[#dad7d7]">
                    Map 3 • Finals Qualifier
                  </p>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-[#00ff85] shadow-[0_0_10px_#00ff85]" />
              </div>
            </div>
          </Card>

          <Card className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#16161d] p-3.5 h-60 lg:h-auto">
            <div className="space-y-2.5 overflow-y-auto pr-1 text-sm">
              {messages.map((msg, idx) => (
                <div key={idx} className="leading-snug">
                  <span className="font-heading font-bold text-[#ba62ff] mr-1.5">
                    {msg.user}:
                  </span>
                  <span className="text-[#dad7d7]">{msg.text}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSend} className="mt-3 flex gap-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Say something..."
                className="h-10 text-sm"
              />
              <Button type="submit" size="icon" className="h-10 w-10 shrink-0">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send chat message</span>
              </Button>
            </form>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

