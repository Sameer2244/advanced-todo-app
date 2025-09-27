import { useAuth } from "@/providers/AuthProvider";

export default function Greetings() {
  const { user, loading } = useAuth();
  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="py-5">
      <div className="flex justify-between">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Good Morning, {user?.email?.split("@")[0]}
        </h2>
        <small className="text-sm leading-none font-medium">{todayDate}</small>
      </div>
      <blockquote className="mt-3 border-l-2 pl-6 italic">
        You&apos;ve got productive day ahead!
      </blockquote>
    </div>
  );
}
