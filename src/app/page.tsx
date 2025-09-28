import FocusOfDay from "@/components/FocusOfDay";
import Greetings from "@/components/Greetings";
import ProductivityInsights from "@/components/ProductivityInsights";
import ProjectOverView from "@/components/ProjectOverView";
import QuickActions from "@/components/QuickActions";
import QuickTodoCard from "@/components/QuickTodoCard";
import QuoteOfTheDay from "@/components/QuoteOfTheDay";
import UpcomingTasks from "@/components/UpcomingTasks";
export default function Home() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-[60%] flex flex-col gap-6">
          <Greetings />
          <FocusOfDay />
          <UpcomingTasks />
          <ProjectOverView />
        </div>
        <div className="w-[30%] 2xl:min-w-[30rem] max-2xl:min-w-[25rem]  flex flex-col gap-6">
          <QuickTodoCard />
          <QuickActions />
          <ProductivityInsights />
          <QuoteOfTheDay />
        </div>
      </div>
    </div>
  );
}
