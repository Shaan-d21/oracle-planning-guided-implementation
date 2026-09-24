import { LearnerShell } from "@/components/learning/learner-shell";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <LearnerShell>{children}</LearnerShell>;
}
